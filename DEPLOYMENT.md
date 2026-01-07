# IPFS Deployment Guide for Raspberry Pi 4

## Overview
This guide will help you deploy your online CV to IPFS using a Raspberry Pi 4 and connect it to a Web3 domain.

## Prerequisites
- Raspberry Pi 4 (2GB+ RAM recommended)
- MicroSD card (16GB+ recommended)
- Internet connection
- Web3 domain (ENS, Unstoppable Domains, or similar)

## Step 1: Set Up Raspberry Pi

### Install Raspberry Pi OS
1. Download Raspberry Pi Imager from https://www.raspberrypi.org/software/
2. Flash Raspberry Pi OS Lite (64-bit) to your SD card
3. Boot your Raspberry Pi and complete initial setup

### Update System
```bash
sudo apt update
sudo apt upgrade -y
```

## Step 2: Install IPFS

### Download and Install Kubo (go-ipfs)
```bash
# Check for the latest version at: https://dist.ipfs.tech/#kubo
# As of this writing, v0.24.0 is the latest. Update the version number as needed.

# Download the latest version for ARM64
wget https://dist.ipfs.tech/kubo/v0.24.0/kubo_v0.24.0_linux-arm64.tar.gz

# Extract
tar -xvzf kubo_v0.24.0_linux-arm64.tar.gz

# Install
cd kubo
sudo bash install.sh

# Verify installation
ipfs --version
```

### Initialize IPFS
```bash
# Initialize IPFS node
ipfs init

# Optional: Configure for low-power device
ipfs config Datastore.StorageMax "10GB"
ipfs config --json Swarm.ConnMgr.HighWater 200
ipfs config --json Swarm.ConnMgr.LowWater 100
```

### Start IPFS Daemon
```bash
# Start the daemon
ipfs daemon &

# Or use systemd for automatic startup (recommended)
sudo nano /etc/systemd/system/ipfs.service
```

Add this content to the service file:
```ini
[Unit]
Description=IPFS Daemon
After=network.target

[Service]
Type=simple
User=pi
Environment="IPFS_PATH=/home/pi/.ipfs"
ExecStart=/usr/local/bin/ipfs daemon
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable ipfs
sudo systemctl start ipfs
sudo systemctl status ipfs
```

## Step 3: Deploy Your CV to IPFS

### Upload to IPFS
```bash
# Navigate to your website directory
cd /path/to/Website-GP

# Add the website to IPFS
ipfs add -r .

# The output will show the CID (Content Identifier)
# Example: added QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Website-GP
```

### Pin the Content (Keep it available)
```bash
# Pin your content to ensure it stays available
ipfs pin add QmYourCIDHere
```

### Test Access
```bash
# Access via local gateway
curl http://localhost:8080/ipfs/QmYourCIDHere

# Or open in browser
# http://localhost:8080/ipfs/QmYourCIDHere
```

## Step 4: Make Content Permanently Available

### Option A: Use Pinning Services
1. **Pinata**: https://pinata.cloud
   - Free tier: 1GB storage
   - Upload your CID or files directly

2. **Web3.Storage**: https://web3.storage
   - Free storage
   - Uses IPFS and Filecoin

3. **NFT.Storage**: https://nft.storage
   - Free for NFTs and related content

### Option B: Keep Pi Running 24/7
```bash
# Ensure IPFS daemon runs on boot
sudo systemctl enable ipfs

# Monitor your node
ipfs swarm peers  # See connected peers
ipfs stats bw     # Check bandwidth usage
ipfs pin ls       # List pinned content
```

## Step 5: Connect to Web3 Domain

### ENS (Ethereum Name Service)
1. Visit https://app.ens.domains
2. Register your .eth domain
3. Set the content hash:
   ```
   # In ENS manager, set Content Hash record to:
   ipfs://QmYourCIDHere
   ```

### Unstoppable Domains
1. Visit https://unstoppabledomains.com
2. Register a domain (.crypto, .nft, .blockchain, etc.)
3. In domain management, set IPFS Hash:
   ```
   IPFS Hash: QmYourCIDHere
   ```

### Handshake Domains
1. Visit https://namebase.io
2. Register a Handshake domain
3. Set DNS records to point to IPFS gateway

## Step 6: Access Your CV

Once deployed, your CV will be accessible via:

### IPFS Gateways
- `https://ipfs.io/ipfs/QmYourCIDHere`
- `https://gateway.pinata.cloud/ipfs/QmYourCIDHere`
- `https://cloudflare-ipfs.com/ipfs/QmYourCIDHere`

### Web3 Domain (after DNS propagation)
- `https://yourname.eth` (using eth.link gateway)
- `https://yourname.eth.limo`
- Direct in browsers with Web3 support (Brave, Opera)

## Step 7: Update Your CV

When you need to update your CV:

```bash
# Make changes to your files
# Add updated version to IPFS
ipfs add -r /path/to/Website-GP

# Get new CID
# Update your Web3 domain's content hash with new CID

# Optional: Keep version history
ipfs pin add QmNewCIDHere
```

## Performance Optimization

### Enable Cloudflare IPFS Gateway
1. Sign up at https://cloudflare.com
2. Add your domain
3. Use Cloudflare's IPFS gateway for faster access

### Monitor Your Node
```bash
# Install monitoring tools
sudo apt install htop iotop

# Monitor IPFS
ipfs stats bw --interval 1s
ipfs diag sys
```

## Troubleshooting

### IPFS Daemon Won't Start
```bash
# Check logs
journalctl -u ipfs -f

# Reset IPFS (careful: this removes all data)
ipfs repo fsck
```

### Content Not Accessible
```bash
# Check if pinned
ipfs pin ls --type=recursive

# Re-pin content
ipfs pin add QmYourCIDHere

# Check peer connections
ipfs swarm peers
```

### Low Performance
```bash
# Reduce resource usage
ipfs config Datastore.StorageMax "5GB"
ipfs config --json Swarm.ConnMgr.HighWater 100
ipfs config --json Swarm.ConnMgr.LowWater 50
```

## Security Considerations

1. **Firewall**: Configure firewall to allow IPFS ports
   ```bash
   sudo ufw allow 4001/tcp  # IPFS swarm
   sudo ufw allow 8080/tcp  # Local gateway (optional)
   sudo ufw enable
   ```

2. **Keep Updated**: Regularly update IPFS and Raspberry Pi OS
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. **Backup**: Keep backups of your IPFS repository
   ```bash
   ipfs repo stat
   tar -czf ipfs-backup.tar.gz ~/.ipfs
   ```

## Additional Resources

- IPFS Documentation: https://docs.ipfs.tech
- Raspberry Pi Forums: https://forums.raspberrypi.com
- ENS Documentation: https://docs.ens.domains
- Unstoppable Domains Docs: https://docs.unstoppabledomains.com

## Cost Estimates

- Raspberry Pi 4 (4GB): ~$55-75
- Power consumption: ~3-5W (~$2-3/month)
- Web3 domain: $5-40/year (depending on provider)
- IPFS hosting: Free (or $1-10/month for pinning services)

Total monthly cost: ~$2-15 depending on setup
