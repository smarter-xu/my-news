// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    title: "",
    source: "",
    date: "",
    readCount: 0,
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    this.getNewsDetail(id)
  },
  getNewsDetail(id, callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
      },
      success: res => {
        let result = res.data.result
        let date = new Date(result.date)
        // 解析日期，并转化为 mm:ss     
        let hour = date.getHours()
        let minutes = date.getMinutes()
        hour = hour < 10 ? "0" + hour : hour
        minutes = minutes < 10 ? "0" + minutes : minutes
        date = hour + ":" + minutes;
        this.setData({
          id: result.id,
          title: result.title,
          source: result.source,
          date: date,
          readCount: result.readCount,
          content: result.content
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})