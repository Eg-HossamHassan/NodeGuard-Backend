
---

##  Authentication Flow

1. User registers with email & password
2. Password is hashed using **bcrypt**
3. JWT token is generated on login
4. Protected routes require token
5. Admin routes require `role: admin`

---

##  API Endpoints

### Auth
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Users (Admin)
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/users` | Get all users (pagination & search) |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### User
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/users/me` | Get logged-in user info |

---

##  Environment Variables

Create a `.env` file in the root directory:

---

## ▶ Running the Project

### Install dependencies
```bash
npm install


