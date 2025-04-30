import { useShare } from '@vueuse/core'

export function useCredentials() {
  const { share, isSupported: canShare } = useShare()

  function generateBookmarkFiles(url, title = 'Bookmark') {
    return {
      Win: {
        content: `[InternetShortcut]\nURL=${url}`,
        extension: '.url',
        mime: 'application/internet-shortcut'
      },
      Mac: {
        content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>URL</key>
  <string>${url}</string>
</dict>
</plist>`,
        extension: '.webloc',
        mime: 'application/x-apple-plist'
      },
      Linux: {
        content: `[Desktop Entry]\nEncoding=UTF-8\nType=Link\nName=${title}\nURL=${url}`,
        extension: '.desktop',
        mime: 'application/x-desktop'
      }
    }
  }

  function saveAs(content, filename, type) {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && canShare) {
      share({
        title: filename,
        text: type.startsWith('text/') ? content : 'Your key file',
        files: [new File([content], filename, { type })]
      })
      return
    }

    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  function saveLink(url, platform, userName) {
    const bookmarks = generateBookmarkFiles(url)
    const bookmark = bookmarks[platform]
    if (!bookmark?.content || !bookmark?.extension) return
    saveAs(
      bookmark.content,
      `${userName || 'account'}${bookmark.extension}`,
      bookmark.mime
    )
  }

  function saveImage(dataUrl, userName, extension = 'png') {
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => saveAs(blob, `${userName || ('account ' + (new Date()).getDate())
        }.${extension}`, blob.type))
  }

  function saveJson(content, userName, extension = 'webkey') {
    saveAs(
      content,
      `${userName || ('account ' + (new Date()).getDate())}.${extension}`,
      'application/json'
    )
  }

  async function shareImage(dataUrl, userName, type = 'png') {
    if (!canShare) {
      console.log('Sharing not supported')
      return
    }
    try {
      const blob = await fetch(dataUrl).then(res => res.blob())
      if (!blob) {
        console.error('Failed to create blob from data URL')
        return
      }
      const file = new File([blob], `${userName || 'avatar'}.${type}`, { type: type == 'png' ? 'image/png' : 'image/svg+xml' })
      return share({
        title: userName || 'Gun-Vue avatar',
        files: [file]
      }).catch(err => console.error('Share failed:', err))
    } catch (err) {
      console.error('Share preparation failed:', err)
    }
  }

  return {
    saveLink,
    saveImage,
    saveJson,
    shareImage
  }
}
