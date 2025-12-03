---
title: Code Language Test
description: Test post with various code languages
pubDate: 2025-12-03
author: Daniel Dieppa
draft: false
tags: [test]
---

# Testing Code Block Language Detection

This post tests various code languages to ensure proper language labels and copy functionality.

## C#

```csharp
public class Example
{
    public string Name { get; set; }
    
    public void Print()
    {
        Console.WriteLine($"Hello {Name}");
    }
}
```

## JavaScript

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}

const user = "World";
greet(user);
```

## TypeScript

```typescript
interface User {
    id: number;
    name: string;
    email?: string;
}

class UserService {
    private users: User[] = [];
    
    addUser(user: User): void {
        this.users.push(user);
    }
    
    findUser(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
}
```

## HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Page</title>
</head>
<body>
    <div class="container">
        <h1>Welcome</h1>
        <p>This is a test page.</p>
    </div>
</body>
</html>
```

## CSS

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.button:hover {
    background: #0056b3;
}
```

## YAML

```yaml
# Docker Compose example
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## JSON

```json
{
  "name": "test-project",
  "version": "1.0.0",
  "description": "A test project",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "webpack": "^5.0.0"
  }
}
```

## Shell

```bash
#!/bin/bash

# Backup script
echo "Starting backup..."

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
SOURCE_DIR="/data"

# Create backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" "$SOURCE_DIR"

# Clean old backups (keep last 7 days)
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.tar.gz"
```

## PowerShell

```powershell
# PowerShell script to manage services
param(
    [Parameter(Mandatory=$true)]
    [string]$ServiceName,
    
    [ValidateSet("Start", "Stop", "Restart", "Status")]
    [string]$Action = "Status"
)

switch ($Action) {
    "Start" {
        Start-Service -Name $ServiceName
        Write-Host "Service $ServiceName started"
    }
    "Stop" {
        Stop-Service -Name $ServiceName
        Write-Host "Service $ServiceName stopped"
    }
    "Restart" {
        Restart-Service -Name $ServiceName
        Write-Host "Service $ServiceName restarted"
    }
    "Status" {
        $status = Get-Service -Name $ServiceName
        Write-Host "Service: $($status.Name) - Status: $($status.Status)"
    }
}
```
