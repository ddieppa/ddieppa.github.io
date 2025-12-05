---
title: "Implementing CQRS with MediatR in .NET"
description: "A deep dive into using MediatR for implementing the Command Query Responsibility Segregation pattern in .NET applications."
pubDate: 2025-12-01
author: "Daniel Dieppa"
tags: ["dotnet", "cqrs", "mediatr", "design-patterns"]
draft: false
---

The Command Query Responsibility Segregation (CQRS) pattern has been invaluable in projects I've worked on, from healthcare systems at QTC Management to e-commerce platforms. MediatR makes implementing this pattern in .NET straightforward and elegant.

## Why CQRS?

Traditional CRUD operations use the same model for reading and writing data. CQRS separates these concerns:

- **Commands**: Change state (create, update, delete)
- **Queries**: Read state (no side effects)

This separation brings several benefits:

1. Optimized read and write models
2. Better scalability
3. Clearer intent in your code
4. Easier testing

## Setting Up MediatR

First, install the packages:

```bash
dotnet add package MediatR
dotnet add package MediatR.Extensions.Microsoft.DependencyInjection
```

Register in your startup:

```csharp
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
```

## Commands: Changing State

Commands represent intentions to change the system state:

```csharp
public record CreateProductCommand(
    string Name,
    decimal Price,
    string Category
) : IRequest<ProductDto>;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IProductRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public async Task<ProductDto> Handle(
        CreateProductCommand request, 
        CancellationToken ct)
    {
        var product = new Product(
            request.Name,
            request.Price,
            request.Category
        );

        await _repository.AddAsync(product, ct);
        await _unitOfWork.SaveChangesAsync(ct);

        return product.ToDto();
    }
}
```

## Queries: Reading State

Queries retrieve data without modifying it:

```csharp
public record GetProductByIdQuery(Guid Id) : IRequest<ProductDto?>;

public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto?>
{
    private readonly IReadOnlyProductRepository _repository;

    public async Task<ProductDto?> Handle(
        GetProductByIdQuery request, 
        CancellationToken ct)
    {
        var product = await _repository.GetByIdAsync(request.Id, ct);
        return product?.ToDto();
    }
}
```

## Adding Validation with Pipeline Behaviors

MediatR pipeline behaviors are perfect for cross-cutting concerns:

```csharp
public class ValidationBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        var context = new ValidationContext<TRequest>(request);
        
        var failures = _validators
            .Select(v => v.Validate(context))
            .SelectMany(r => r.Errors)
            .Where(f => f != null)
            .ToList();

        if (failures.Any())
            throw new ValidationException(failures);

        return await next();
    }
}
```

## In Your Controllers

Using it in controllers keeps them thin:

```csharp
[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(CreateProductCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetProductByIdQuery(id));
        return result is null ? NotFound() : Ok(result);
    }
}
```

## When to Use CQRS

CQRS isn't always necessary. Consider it when:

- Read and write patterns differ significantly
- You need to scale reads and writes independently
- Your domain has complex business logic
- You want clear separation of concerns

## Conclusion

MediatR + CQRS has become my default architecture for complex .NET applications. The pattern provides clear structure, testability, and maintainability. Start simple and add complexity only when needed.

In my next post, I'll cover how to add Event Sourcing on top of CQRS. Stay tuned!






