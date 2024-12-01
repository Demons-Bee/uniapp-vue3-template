const { execSync } = require('child_process');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const { NodeSSH } = require('node-ssh');
const dotenv = require('dotenv');

// 根据当前环境加载对应的环境变量
const env = process.env.NODE_ENV || 'production';
dotenv.config({ path: `.env.${env}` });

const getDateTime = () => {
  const now = new Date();
  return now.toISOString()
    .replace(/[:-]/g, '')
    .replace(/[T.]/g, '_')
    .slice(0, 15);
};

const platform = process.argv[2];
const dateTime = getDateTime();
const zipFileName = `${platform}-dist-${dateTime}.zip`;
const zipFilePath = path.join(path.resolve(__dirname, '../dist/zips'), zipFileName);

async function uploadToServer(localFile) {
  const ssh = new NodeSSH();
  
  try {
    console.log('Connecting to server...');
    await ssh.connect({
      host: process.env.VITE_DEPLOY_SERVER_HOST,
      port: parseInt(process.env.VITE_DEPLOY_SERVER_PORT || '22'),
      username: process.env.VITE_DEPLOY_SERVER_USERNAME,
      password: process.env.VITE_DEPLOY_SERVER_PASSWORD,
    });
    
    console.log('Uploading file...');
    await ssh.putFile(localFile, `${process.env.VITE_DEPLOY_REMOTE_PATH}/${path.basename(localFile)}`);
    
    console.log('Upload completed successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  } finally {
    ssh.dispose();
  }
}

// 先执行构建
execSync(`npm run build:${platform}`, { stdio: 'inherit' });

// 创建输出目录
const zipDir = path.resolve(__dirname, '../dist/zips');
if (!fs.existsSync(zipDir)) {
  fs.mkdirSync(zipDir, { recursive: true });
}

// 创建写入流
const output = fs.createWriteStream(zipFilePath);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

// 监听事件
output.on('close', () => {
  console.log(`Successfully created ${zipFileName}`);
  // 压缩完成后上传
  uploadToServer(zipFilePath);
});

archive.on('error', (err) => {
  console.error('Error creating zip:', err);
  process.exit(1);
});

// 管道连接
archive.pipe(output);

// 添加文件
archive.directory(path.resolve(__dirname, `../dist/build/${platform}`), false);

// 完成打包
archive.finalize(); 