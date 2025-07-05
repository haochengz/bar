const fs = require('fs');
const path = require('path');
const { https } = require('follow-redirects');

// 配置常量
const TOTAL = 100; // 目标图片总数
const CONCURRENCY = 10; // 同时最多发起多少个下载请求
const TIMEOUT = 10000; // 每个请求的最大等待时间（ms）
const RETRIES = 2; // 下载失败后最多重试几次

// 创建保存图片的目录
const dir = path.resolve(__dirname, '../src/assets/img');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 删除错误或损坏的文件
function safeUnlink(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.warn(`⚠️ Failed to delete corrupted file: ${filePath}`);
    }
  }
}

// 下载单张图片（带超时 + 自动重试）
function downloadImage(index, attempt = 1) {
  return new Promise((resolve, reject) => {
    const url = `https://picsum.photos/300/200?random=${index}`;
    const filePath = path.join(dir, `img${index}.jpg`);
    const file = fs.createWriteStream(filePath);

    const req = https.get(url, res => {
      // 只接受 200 成功响应，其他都视为失败
      if (res.statusCode !== 200) {
        safeUnlink(filePath);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      // 正常管道写入文件
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    });

    // 请求超时处理
    req.setTimeout(TIMEOUT, () => {
      req.destroy();
      file.destroy();
      safeUnlink(filePath);
      reject(new Error(`Timeout on image ${index}`));
    });

    // 请求错误处理
    req.on('error', err => {
      file.destroy();
      safeUnlink(filePath);
      reject(err);
    });
  }).catch(err => {
    // 如果失败次数没超限，则递归重试
    if (attempt <= RETRIES) {
      console.warn(`🔁 Retry ${index} (attempt ${attempt})...`);
      return downloadImage(index, attempt + 1);
    } else {
      // 超过重试次数就抛出错误
      throw err;
    }
  });
}

// 主执行函数，控制下载调度和并发
async function run() {
  let active = 0; // 当前正在下载的数量
  let completed = 0; // 成功完成的数量
  let nextIndex = 1; // 当前准备开始的图片索引
  const failedIndices = []; // 失败但可重试的索引队列

  return new Promise(done => {
    // 控制下载调度
    function startNext() {
      // 在不超过并发限制的前提下持续分配任务
      while (active < CONCURRENCY && (nextIndex <= TOTAL || failedIndices.length > 0)) {
        let current;
        if (nextIndex <= TOTAL) {
          current = nextIndex++;
        } else {
          current = failedIndices.shift();
        }

        active++;

        // 启动图片下载任务
        downloadImage(current)
          .then(() => {
            completed++;
            console.log(`✅ Downloaded ${completed}/${TOTAL}`);
          })
          .catch(err => {
            console.error(`❌ Failed to download ${current}: ${err.message}`);
            failedIndices.push(current); // 将失败的任务推回队列
          })
          .finally(() => {
            active--;
            // 成功达到目标数量即结束任务
            if (completed === TOTAL) return done();
            // 启动下一个任务
            startNext();
          });
      }
    }

    // 初次调度
    startNext();
  });
}

// 启动脚本
run()
  .then(() => {
    console.log('\n🎉 All images downloaded successfully.\n');
  })
  .catch(err => {
    console.error('❌ Download failed:', err);
  });
