layui.use(['layer'], function() {
  console.log('layui is loading...')
})

const refresh = (win) => {
  const location = win ? win.location : window.location
  location.href = location.pathname + location.search
}