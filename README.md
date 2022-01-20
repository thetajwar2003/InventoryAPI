
## API Reference


```http
  GET /items
```

| Description                       |
| :-------------------------------- |
| **Required**. Returns all items in inventory |


```http
  GET /items/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Returns all items in inventory |

```http
  POST /item
```

 | Type     | Description                       |
 | :------- | :-------------------------------- |
 | `json` | **Required**: Adds item to inventory |

```http
  PUT /items/:id
```

 | Parameter | Type     | Description                       |
 | :-------- | :------- | :-------------------------------- |
 | `id`     | `string` | **Required**: Updates specific item |

```http
  DELETE /items/:id
```

 | Parameter | Type     | Description                       |
 | :-------- | :------- | :-------------------------------- |
 | `id`     | `string` | **Required**: Deletes specific item |

```http
  GET /csv
```

| Description                       |
| :-------------------------------- |
| Returns download link to csv |

```http
  GET /csv/:id
```

 | Parameter | Type     | Description                       |
 | :-------- | :------- | :-------------------------------- |
 | `id`     | `string` | **Required**: Returns download link to csv |
