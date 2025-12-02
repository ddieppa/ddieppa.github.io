---
title: "Azure Functions Best Practices I've Learned the Hard Way"
description: "Real-world lessons from building production Azure Functions, covering error handling, scaling, and integration patterns."
pubDate: 2025-11-28
author: "Daniel Dieppa"
tags: ["azure", "serverless", "dotnet", "cloud"]
draft: false
---

After building several production Azure Functions applications, including a large-scale offer management platform at Dynata, I've learned some valuable lessons. Here are my best practices for building reliable Azure Functions.

## 1. Handle Poison Messages Gracefully

One of the first things I learned is that Azure Functions can create infinite retry loops with bad messages:

```csharp
[Function("ProcessOrder")]
public async Task Run(
    [ServiceBusTrigger("orders", Connection = "ServiceBusConnection")] 
    ServiceBusReceivedMessage message,
    ServiceBusMessageActions messageActions)
{
    try
    {
        var order = JsonSerializer.Deserialize<Order>(message.Body);
        await _orderProcessor.ProcessAsync(order);
        await messageActions.CompleteMessageAsync(message);
    }
    catch (ValidationException ex)
    {
        // Dead letter messages that will never succeed
        await messageActions.DeadLetterMessageAsync(message, 
            deadLetterReason: "ValidationFailed",
            deadLetterErrorDescription: ex.Message);
    }
    catch (Exception ex)
    {
        // Let transient errors retry
        _logger.LogError(ex, "Failed to process order");
        throw;
    }
}
```

## 2. Use Durable Functions for Long-Running Workflows

For complex workflows that span multiple services, Durable Functions are a game-changer:

```csharp
[Function("OrderOrchestrator")]
public static async Task<OrderResult> RunOrchestrator(
    [OrchestrationTrigger] TaskOrchestrationContext context)
{
    var orderId = context.GetInput<Guid>();
    
    // Each activity can be retried independently
    var inventory = await context.CallActivityAsync<bool>(
        "CheckInventory", orderId);
    
    if (!inventory)
        return new OrderResult { Success = false, Reason = "Out of stock" };
    
    var payment = await context.CallActivityAsync<PaymentResult>(
        "ProcessPayment", orderId);
    
    await context.CallActivityAsync("SendConfirmation", orderId);
    
    return new OrderResult { Success = true };
}
```

## 3. Implement Proper Logging with Application Insights

Structured logging is essential for troubleshooting:

```csharp
public class OrderProcessor
{
    private readonly ILogger<OrderProcessor> _logger;

    public async Task ProcessAsync(Order order)
    {
        using var scope = _logger.BeginScope(new Dictionary<string, object>
        {
            ["OrderId"] = order.Id,
            ["CustomerId"] = order.CustomerId
        });

        _logger.LogInformation("Processing order started");
        
        // Process order...
        
        _logger.LogInformation("Processing order completed in {Duration}ms", 
            stopwatch.ElapsedMilliseconds);
    }
}
```

## 4. Configure Scaling Appropriately

Don't let your functions scale infinitely and overwhelm downstream services:

```json
{
  "extensions": {
    "serviceBus": {
      "maxConcurrentCalls": 16,
      "maxConcurrentSessions": 8,
      "prefetchCount": 100
    }
  }
}
```

## 5. Use Managed Identities

Stop putting connection strings in your config:

```csharp
[Function("ProcessBlob")]
public async Task Run(
    [BlobTrigger("uploads/{name}", Connection = "StorageConnection")] 
    Stream blob,
    string name)
{
    // Connection uses Managed Identity - no secrets needed!
    await _blobProcessor.ProcessAsync(blob, name);
}
```

## Key Takeaways

- Always plan for failure and poison messages
- Use Durable Functions for complex workflows
- Invest in proper logging and monitoring
- Be mindful of scaling and downstream dependencies
- Embrace Managed Identities for security

These patterns have saved me countless hours of debugging and helped build more reliable systems. What Azure Functions patterns have worked well for you?

