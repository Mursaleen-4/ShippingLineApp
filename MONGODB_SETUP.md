# 🔧 MongoDB Atlas Setup Guide

## Current Issue: Authentication Failed

The application is experiencing authentication issues with MongoDB Atlas. Here's a comprehensive guide to resolve this:

## 📋 Step-by-Step Resolution

### 1. **Verify Database User Credentials**

In MongoDB Atlas Dashboard:
1. Navigate to **Database Access** (left sidebar)
2. Check if user `ShippingUser` exists
3. If not, create a new user:
   - **Username**: `ShippingUser`
   - **Password**: `StrongPass123` (or generate a new secure password)
   - **Database User Privileges**: Select "Read and write to any database"

### 2. **Check Network Access**

In MongoDB Atlas Dashboard:
1. Navigate to **Network Access** (left sidebar)
2. **Add IP Address** for your current location
   - **Temporary Solution**: Add `0.0.0.0/0` (allows access from anywhere)
   - **Recommended**: Add your specific public IP address
3. Save the changes and wait for them to take effect (may take a few minutes)

### 3. **Verify Database and Collection Names**

1. Go to **Database** in Atlas Dashboard
2. Confirm cluster name: `ShippingCluster`
3. Database name should be: `shippingDB`
4. If different, update the connection string accordingly

### 4. **Test the Connection String Components**

Current connection string breakdown:
```
mongodb+srv://ShippingUser:StrongPass123@shippingcluster.rqfhr3i.mongodb.net/shippingDB?retryWrites=true&w=majority&appName=ShippingCluster
```

- **Username**: `ShippingUser`
- **Password**: `StrongPass123`
- **Cluster**: `shippingcluster.rqfhr3i.mongodb.net`
- **Database**: `shippingDB`
- **App Name**: `ShippingCluster`

### 5. **Generate New Connection String** (if needed)

If the current connection string is incorrect:
1. In MongoDB Atlas, go to **Database**
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Select **Node.js** and version **4.1 or later**
5. Copy the new connection string
6. Replace `<password>` with your actual password

## 🔄 Alternative Setup Methods

### Method 1: Use Atlas Connection String Generator
1. MongoDB Atlas Dashboard → **Database** → **Connect**
2. Choose **Connect your application**
3. Copy connection string and update `.env` file

### Method 2: Create a New Cluster (if current one has issues)
1. **Create Cluster** → **Shared** (free tier)
2. **Cloud Provider & Region**: Choose closest to your location
3. **Cluster Name**: `ShippingCluster`
4. Wait for cluster creation (5-10 minutes)

### Method 3: Local MongoDB (Alternative)
If Atlas continues to have issues, you can use local MongoDB:

```bash
# Install MongoDB locally
# Then update .env with:
MONGO_URI=mongodb://localhost:27017/shippingDB
```

## 🧪 Testing the Connection

After making changes, test the connection:

```bash
# From the server directory
node test-connection.js
```

Or run the full seed script:
```bash
# From the root directory
npm run seed
```

## 📞 MongoDB Atlas Support Checklist

Before contacting support, verify:

- [ ] **User exists** with correct username/password
- [ ] **Network access** is configured for your IP
- [ ] **Database user permissions** include read/write access
- [ ] **Cluster is running** and not paused
- [ ] **Connection string** matches your cluster details
- [ ] **Firewall/antivirus** isn't blocking the connection
- [ ] **Internet connection** is stable

## 🔐 Security Best Practices

Once connected:

1. **Restrict Network Access**: Remove `0.0.0.0/0` and add specific IPs
2. **Use Strong Passwords**: Generate complex passwords
3. **Principle of Least Privilege**: Give users only necessary permissions
4. **Enable Database Auditing**: For production environments
5. **Regular Backups**: Configure automated backups

## 🚀 Quick Fix Commands

```bash
# 1. Update environment variables
cp .env.example .env
# Edit .env with correct connection string

# 2. Test connection
cd server && node test-connection.js

# 3. If successful, run seed script
cd .. && npm run seed

# 4. Start the server
npm run dev:server
```

## 📝 Common Error Messages and Solutions

### "Authentication failed"
- Check username/password in Atlas
- Verify user has database permissions

### "IP not allowed"
- Add your IP to Network Access in Atlas
- Check firewall settings

### "Connection timeout"
- Check internet connection
- Try different network (mobile hotspot)
- Contact Atlas support

### "Database not found"
- Database will be created automatically on first connection
- Verify database name in connection string

---

**Need immediate help?** Try the connection with these steps:

1. Go to Atlas → Database → Connect → Connect your application
2. Copy the exact connection string provided
3. Replace `<password>` with your actual password
4. Update the `.env` file
5. Run `npm run seed` again
