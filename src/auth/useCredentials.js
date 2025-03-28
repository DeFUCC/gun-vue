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

  return {
    saveLink: (url, platform, userName) => {
      const bookmarks = generateBookmarkFiles(url)
      const bookmark = bookmarks[platform]
      if (!bookmark?.content || !bookmark?.extension) return
      saveAs(
        bookmark.content,
        `${userName || 'account'}${bookmark.extension}`,
        bookmark.mime
      )
    },
    savePng: (dataUrl, userName) => {
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => saveAs(blob, `${userName || 'avatar'}.png`, blob.type))
    },
    saveJson: (content, userName) => {
      saveAs(
        JSON.stringify(content),
        `${userName || 'account'}.json`,
        'application/json'
      )
    }
  }
}
