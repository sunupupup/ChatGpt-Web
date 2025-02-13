import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/api/chat/completions', async (req, res) => {
  // 设置流式响应头
  res.setHeader('Content-Type', 'application/stream+json')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // 模拟生成流式数据（实际替换为 AI 模型调用）
  const { messages } = req.body
  const sampleResponse = '这是一个流式回复示例，内容会分多次发送。'.split('')

  // 发送初始数据块（segment: 'start'）
  res.write(
    JSON.stringify({
      dateTime: new Date().toISOString(),
      role: 'assistant',
      content: '',
      segment: 'start'
    }) + '\n'
  )

  // 逐块发送内容（segment: 'text'）
  for (let i = 0; i < sampleResponse.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100)) // 模拟延迟
    res.write(
      JSON.stringify({
        dateTime: new Date().toISOString(),
        content: sampleResponse[i],
        segment: 'text'
      }) + '\n'
    )
  }

  // 发送结束标志（segment: 'stop'）
  res.write(
    JSON.stringify({
      dateTime: new Date().toISOString(),
      segment: 'stop'
    }) + '\n'
  )

  // 结束响应
  res.end()
})

// 启动服务器
app.listen(5678, () => {
  console.log('Server is running on port 5678')
})
