# 🛡️ **User Authentication API Documentation**

This documentation provides an overview of the user authentication API, including the available endpoints, request/response formats, and error handling. The API is designed to handle user registration, login, logout, password reset, and other related functionalities.

---

## 📌 **Table of Contents**

- **Register User**
- [**Verify OTP**](#verify-otp)
- [**Login User**](#login-user)
- [**Logout User**](#logout-user)
- [**Get User Info**](#get-user-info)
- [**Forget Password**](#forget-password)
- [**Verify Reset Password OTP**](#verify-reset-password-otp)
- [**Reset Password**](#reset-password)

---

## 🌐 **API Base URL**

🔗 All endpoints are prefixed with:
```
/api/v1/user
```

---

## 📝 **Register User**

Registers a new user and sends a verification code via email or phone.

### **🔹 Endpoint**
```
POST /api/v1/user/register
```

### **📤 Request Body**

| **Field**               | **Type**   | **Description**                                    |
|-------------------------|-----------|--------------------------------------------------|
| **name**               | `string`   | Full name of the user.                           |
| **email**              | `string`   | Email address of the user (optional).           |
| **phone**              | `string`   | Phone number of the user (optional).            |
| **password**           | `string`   | Password for the user account.                  |
| **verificationMethod** | `string`   | Verification method (`email` or `phone`).       |

### ✅ **Response**
- **Success (200):** Verification code sent to the provided email or phone.
- **Error (400):** Missing fields, invalid phone number, or user already exists.

#### 📌 **Example Request**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password": "securePassword123",
  "verificationMethod": "email"
}
```

---

## 🔑 **Verify OTP**

Verifies the OTP sent to the user during registration or password reset.

### **🔹 Endpoint**
```
POST /api/v1/user/verifyotp
```

### **📤 Request Body**

| **Field**  | **Type**   | **Description**                |
|------------|-----------|--------------------------------|
| **email**  | `string`   | Email address of the user.    |
| **phone**  | `string`   | Phone number of the user.     |
| **otp**    | `string`   | OTP sent to the user.         |

### ✅ **Response**
- **Success (200):** OTP verified successfully.
- **Error (400):** Invalid OTP, expired OTP, or missing fields.

#### 📌 **Example Request**
```json
{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

---

## 🔓 **Login User**

Authenticates a user and returns a JWT token.

### **🔹 Endpoint**
```
POST /api/v1/user/login
```

### **📤 Request Body**

| **Field**    | **Type**   | **Description**                |
|-------------|-----------|--------------------------------|
| **email**   | `string`   | Email address of the user.    |
| **phone**   | `string`   | Phone number of the user.     |
| **password**| `string`   | Password for the user.        |

### ✅ **Response**
- **Success (200):** Returns a JWT token and user details.
- **Error (400):** Invalid credentials or missing fields.

#### 📌 **Example Request**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## 🚪 **Logout User**

Logs out the user and invalidates the JWT token.

### **🔹 Endpoint**
```
GET /api/v1/user/logout
```

### **📥 Headers**

| **Field**         | **Type**   | **Description**                  |
|------------------|-----------|----------------------------------|
| **Authorization** | `string`   | JWT token (e.g., Bearer Token) |

### ✅ **Response**
- **Success (200):** User logged out successfully.
- **Error (401):** Unauthorized access.

---

## 👤 **Get User Info**

Retrieves the authenticated user's profile information.

### **🔹 Endpoint**
```
GET /api/v1/user/profile
```

### **📥 Headers**

| **Field**         | **Type**   | **Description**                  |
|------------------|-----------|----------------------------------|
| **Authorization** | `string`   | JWT token (e.g., Bearer Token) |

### ✅ **Response**
- **Success (200):** Returns the user's profile information.
- **Error (401):** Unauthorized access.

---

## 🔄 **Forget Password**

Initiates the password reset process by sending a verification link (email) or OTP (phone).

### **🔹 Endpoint**
```
POST /api/v1/user/forgetPassword
```

### **📤 Request Body**

| **Field**  | **Type**   | **Description**                |
|-----------|-----------|--------------------------------|
| **email** | `string`   | Email address of the user.    |
| **phone** | `string`   | Phone number of the user.     |

### ✅ **Response**
- **Success (200):** Verification link or OTP sent successfully.
- **Error (400):** Missing fields or user not found.

#### 📌 **Example Request**
```json
{
  "email": "john.doe@example.com"
}
```

---

## ℹ️ **Notes**

- ✅ All endpoints require proper validation and error handling.
- 🔐 The `authUser` middleware ensures only authenticated users access protected endpoints.
- 🔑 The API uses JWT tokens for authentication, which must be included in the `Authorization` header for protected routes.

---
