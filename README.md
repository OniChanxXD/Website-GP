# Website-GP - Online CV

A professional, responsive online CV/resume website designed to be hosted on IPFS via Raspberry Pi 4 and connected to a Web3 domain.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **IPFS Ready**: Optimized for deployment on IPFS (InterPlanetary File System)
- **Web3 Compatible**: Ready to be connected to ENS, Unstoppable Domains, or other Web3 domains
- **Lightweight**: Pure HTML, CSS, and JavaScript - no build process required
- **Print Friendly**: Optimized for printing as a PDF
- **Dark Mode Support**: Automatically adapts to user's color scheme preference
- **Accessibility**: Semantic HTML and ARIA-friendly

## 📁 Project Structure

```
Website-GP/
├── index.html          # Main CV page
├── styles.css          # Styling and responsive design
├── script.js           # Interactive features and IPFS utilities
├── profile.jpg         # Profile picture (replace with your own)
├── DEPLOYMENT.md       # Detailed deployment guide
├── .ipfsignore         # Files to exclude from IPFS
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/OniChanxXD/Website-GP.git
   cd Website-GP
   ```

2. Edit the content in `index.html` to add your information:
   - Name and title
   - Contact information
   - Work experience
   - Education
   - Skills
   - Projects
   - Certifications

3. Replace `profile.jpg` with your own profile picture (150x150px recommended)

4. Open `index.html` in your browser to preview:
   ```bash
   # On Linux/Mac
   open index.html
   
   # Or use a simple HTTP server
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Customization

#### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... */
}
```

#### Content
All content is in `index.html`. Simply search and replace:
- `Your Name` with your actual name
- `Your Professional Title` with your job title
- Contact information sections
- Experience, education, and skills sections

## 🌐 Deployment to IPFS

### Method 1: Using Raspberry Pi 4 (Recommended)

Follow the comprehensive guide in [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Installing IPFS on Raspberry Pi 4
- Deploying your CV to IPFS
- Connecting to a Web3 domain (ENS, Unstoppable Domains)
- Keeping your content available 24/7

### Method 2: Using IPFS Desktop

1. Download [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)
2. Install and launch IPFS Desktop
3. Click "Add" and select the Website-GP folder
4. Copy the CID (Content Identifier)
5. Access via: `https://ipfs.io/ipfs/YOUR_CID_HERE`

### Method 3: Using Pinning Services

Upload to services like:
- [Pinata](https://pinata.cloud) - Easy web interface
- [Web3.Storage](https://web3.storage) - Free IPFS/Filecoin storage
- [NFT.Storage](https://nft.storage) - Free storage for NFT-related content

## 🔗 Connecting to Web3 Domain

### ENS (.eth domains)
1. Register at [app.ens.domains](https://app.ens.domains)
2. Set Content Hash to `ipfs://YOUR_CID_HERE`
3. Access via: `yourname.eth.limo` or browsers with Web3 support

### Unstoppable Domains (.crypto, .nft, etc.)
1. Register at [unstoppabledomains.com](https://unstoppabledomains.com)
2. Set IPFS Hash in domain management
3. Access via browsers with Web3 support or gateways

## 📱 Access Your CV

Once deployed, your CV will be accessible via:

### IPFS Gateways
- `https://ipfs.io/ipfs/YOUR_CID`
- `https://gateway.pinata.cloud/ipfs/YOUR_CID`
- `https://cloudflare-ipfs.com/ipfs/YOUR_CID`

### Web3 Domain (after setup)
- `https://yourname.eth.limo` (ENS)
- Direct in Brave, Opera, or other Web3-enabled browsers

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **Vanilla JavaScript**: No frameworks or dependencies
- **IPFS**: Decentralized storage
- **Web3**: Blockchain-based domains

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Brave: ✅ Full support + native IPFS
- Opera: ✅ Full support + native Web3

### Performance
- **Load Time**: < 1s on most connections
- **Size**: < 20KB (HTML + CSS + JS)
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)

## 🔒 Security & Privacy

- No external dependencies or CDNs
- No tracking scripts or analytics
- No cookies or local storage
- All assets self-hosted
- IPFS provides content addressing (tamper-proof)

## 📝 Updating Your CV

1. Make changes to `index.html`, `styles.css`, or other files
2. Re-deploy to IPFS (get new CID)
3. Update your Web3 domain's content hash
4. Old versions remain accessible via their CID (version history)

## 🤝 Contributing

This is a personal CV project, but feel free to:
- Fork for your own use
- Submit issues for bugs
- Suggest improvements

## 📄 License

Feel free to use this template for your own CV. Attribution appreciated but not required.

## 🙏 Acknowledgments

- Built for decentralized web hosting
- Optimized for Raspberry Pi 4
- Inspired by Web3 and IPFS communities

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides
2. Visit [IPFS Documentation](https://docs.ipfs.tech)
3. Join IPFS Discord or forums

---

**Made with ❤️ for the decentralized web**

Hosted on IPFS 🌐 | Powered by Raspberry Pi 4 🥧 | Connected via Web3 🔗
