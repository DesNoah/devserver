(global => {

  const log = console.log.bind(this)

  const require_config = {
    paths: {
      jquery: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min',
      layui: '/static/js/layui/layui',
      upload: '/static/js/plupload/plupload.full.min',
      common: '/static/js/common',
      cn: '/static/js/cn'
    },
    map: {
      '*': {
        css: '/static/js/css.min.js'
      }
    }
  }

  const uploader_config = {
    url: 'http://118.24.88.239:3000/files/add',
    flash_swf_url: '/static/js/plupload/Moxie.swf',
    silverlight_xap_url: '/static/js/plupload/Moxie.xap'
  }

  require.config(require_config)

  require(['jquery', 'common', 'upload', 'cn'], ($) => {

    // make delete method
    const deleteThis = (id) => {
      const deleteUrl = '/files/delete',
            fileId = id ? { id: id } : null
      if (!fileId) {
        layer.confirm(cn.delete_all, {
          yes: index => {
            sendAjax(deleteUrl, null, () => {
              refresh()
            })
          }
        })
      } else {
        sendAjax(deleteUrl, fileId, () => {
          refresh()
        })
      }
    }

    // instantiate uploader
    const uploader = new plupload.Uploader({
      browse_button: 'upload',
      url: uploader_config.url,
      flash_swf_url: uploader_config.flash_swf_url,
      silverlight_xap_url: uploader_config.silverlight_xap_url
    })

    // bind events to uploader
    uploader.bind('FilesAdded', (up, files) => {
      up.start()
      log('@uploader: upload start...')
    })

    uploader.bind('FileUploaded', (up, file, res) => {
      if (res.status === 200) {
        const result = JSON.parse(res.response)
        layer.msg(cn.upload_success, {
          end: () => {
            refresh()
          }
        })
      }
    })
    
    // initial uploader
    uploader.init()
    
    global.deleteThis = deleteThis
  })

})(window)