//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    newsTypeList: [{
        text: "国内",
        value: "gn"
      },
      {
        text: "国际",
        value: "gj"
      },
      {
        text: "财经",
        value: "cj"
      },
      {
        text: "娱乐",
        value: "yl"
      },
      {
        text: "军事",
        value: "js"
      },
      {
        text: "体育",
        value: "ty"
      },
      {
        text: "其他",
        value: "other"
      }
    ],
    newsList: [],
    currentType: "gn",
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function() {
    this.getNewsList(this.data.currentType);
  },
  getNewsList(currentType, callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: currentType
      },
      success: res => {
        let result = res.data.result
        // 解析日期，并转化为 mm:ss
        for (let i = 0; i < result.length; i++) {
          let date = new Date(result[i].date)
          let hour = date.getHours()
          let minutes = date.getMinutes()
          hour = hour < 10 ? "0" + hour : hour
          minutes = minutes < 10 ? "0" + minutes : minutes
          result[i].date = hour + ":" + minutes
          if (!result[i].firstImage){
            result[i].firstImage = "../../images/default.png"
          }
        }
        this.setData({
          newsList: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  onBindTap(event) {
    // 获取新闻类型，并刷新新闻列表
    let currentType = event.target.id
    this.getNewsList(currentType, () => {
      this.setData({
        currentType: currentType
      })
    });
  },
  onPullDownRefresh() {
    this.getNewsList(this.data.currentType, () => {
      wx.stopPullDownRefresh()
    })
  },
  onTapNews(event){
    // 获取新闻id，跳转到详情页面
    // console.log(event)
    let newsId = event.currentTarget.id
    // console.log(newsId)
    wx.navigateTo({
      url: '../detail/detail?id=' + newsId,
    })
  }
})