#!/bin/bash

# IPFS Deployment Script for Website-GP CV
# This script helps deploy your CV to IPFS

set -e

echo "🌐 Website-GP IPFS Deployment Script"
echo "===================================="
echo ""

# Check if IPFS is installed
if ! command -v ipfs &> /dev/null; then
    echo "❌ IPFS is not installed!"
    echo "Please install IPFS first:"
    echo "  Visit: https://docs.ipfs.tech/install/"
    echo "  Or see DEPLOYMENT.md for Raspberry Pi instructions"
    exit 1
fi

echo "✅ IPFS found: $(ipfs --version)"
echo ""

# Check if IPFS daemon is running
if ! ipfs swarm peers &> /dev/null; then
    echo "⚠️  IPFS daemon is not running"
    echo "Starting IPFS daemon in background..."
    ipfs daemon &
    DAEMON_PID=$!
    echo "Waiting for daemon to start..."
    
    # Wait for daemon to be ready (max 30 seconds)
    WAIT_COUNT=0
    while ! ipfs swarm peers &> /dev/null && [ $WAIT_COUNT -lt 30 ]; do
        sleep 1
        WAIT_COUNT=$((WAIT_COUNT + 1))
    done
    
    if [ $WAIT_COUNT -ge 30 ]; then
        echo "❌ IPFS daemon failed to start within 30 seconds"
        exit 1
    fi
    
    echo "✅ IPFS daemon started successfully"
    STARTED_DAEMON=true
else
    echo "✅ IPFS daemon is running"
    STARTED_DAEMON=false
fi

echo ""
echo "📦 Adding website to IPFS..."
echo ""

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Add to IPFS (respects .ipfsignore for exclusions)
RESULT=$(ipfs add -r -Q "$SCRIPT_DIR" | tail -n 1)

if [ -z "$RESULT" ]; then
    echo "❌ Failed to add to IPFS"
    exit 1
fi

CID=$RESULT

echo ""
echo "✅ Successfully added to IPFS!"
echo ""
echo "📋 Your Content Identifier (CID):"
echo "   $CID"
echo ""
echo "🌐 Access your CV via these gateways:"
echo "   https://ipfs.io/ipfs/$CID"
echo "   https://gateway.pinata.cloud/ipfs/$CID"
echo "   https://cloudflare-ipfs.com/ipfs/$CID"
echo "   http://localhost:8080/ipfs/$CID (local)"
echo ""

# Pin the content
echo "📌 Pinning content to keep it available..."
ipfs pin add "$CID" &> /dev/null
echo "✅ Content pinned successfully"
echo ""

# Save CID to file
echo "$CID" > "$SCRIPT_DIR/.last-cid"
echo "💾 CID saved to .last-cid"
echo ""

# Show instructions for Web3 domains
echo "🔗 Next Steps for Web3 Domain:"
echo ""
echo "For ENS (.eth):"
echo "  1. Visit https://app.ens.domains"
echo "  2. Go to your domain settings"
echo "  3. Set Content Hash to: ipfs://$CID"
echo ""
echo "For Unstoppable Domains:"
echo "  1. Visit https://unstoppabledomains.com"
echo "  2. Go to your domain management"
echo "  3. Set IPFS Hash to: $CID"
echo ""

# Optionally stop the daemon if we started it
if [ "$STARTED_DAEMON" = true ]; then
    echo "⚠️  Note: IPFS daemon was started in background (PID: $DAEMON_PID)"
    echo "   To keep it running: disown $DAEMON_PID"
    echo "   To stop it: kill $DAEMON_PID"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📚 For more information, see DEPLOYMENT.md"
