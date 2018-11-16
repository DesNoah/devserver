(global => {

  global.sendAjax = (url, data, successCallback) => {
    $.post(url, data, (data, textStatus, jqXHR) => {
      successCallback && successCallback(data, textStatus, jqXHR)
    })
  }
  global.refresh = (win) => {
    const location = win ? win.location : window.location
    location.href = location.pathname + location.search
  }


})(window)

define(['layui'], () => {
  layui.use(['layer'], function () {
    console.log('layui is loading...')
  })
})