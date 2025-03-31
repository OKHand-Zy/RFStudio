# RobotFramework Studio 

**Learn Robot Framework the Easy Way:** Visual Block Programming. This project delivers a visual programming tool that simplifies the creation of Robot Framework test scripts using an accessible block-based approach.

Your Fast Track to Robot Framework Mastery. This project is designed as a learning website to provide a quick and easy onboarding experience for those new to or unfamiliar with Robot Framework.

**Works with: Robot Framework 7.0+.**   
**Guided by: Robot Framework User Guide 7.2.**

## Features

- Visual block-based programming interface using Blockly
- Real-time Robot Framework code generation
- Support for common Robot Framework libraries and keywords
- Export generated code to .robot files
- Easy-to-use drag-and-drop interface

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/OKHand-Zy/rfstudio.git
cd rfstudio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit http://localhost:3000

## Future
- [x] Robot Framework Standard libraries v7.2.2 (2025/03/31)
  - [x] Basic framework
  - [x] BuiltIn
  - [x] Collections
  - [x] DateTime
  - [x] Dialogs
  - [x] OperatingSystem
  - [x] Process
  - [x] Screenshot
  - [x] String
  - [x] Telnet
  - [x] XML
- [ ] Add import other Robot Framework library html file transfer to blockly
 
## Issues
- Telnet.open_connection_container => option 拖移參數沒有防只有一個

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or create an Issue.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

