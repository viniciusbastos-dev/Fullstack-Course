```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Submit the form
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Browser: Response 201 Created
    deactivate Server
```