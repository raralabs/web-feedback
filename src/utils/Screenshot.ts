

async function takeScreenshotStream() {
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/screen
  const width = screen.width * (window.devicePixelRatio || 1);
  const height = screen.height * (window.devicePixelRatio || 1);

  const errors:any[] = [];
  let stream;
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      audio: false,
      // see: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints/video
      video: {
        width,
        height,
        frameRate: 1
      }
    });
  } catch (ex) {
    errors.push(ex);
    return null;
  }

  // for electron js
  if (navigator.userAgent.indexOf('Electron') >= 0) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
        // video: {
        //   mandatory: {
        //     chromeMediaSource: 'desktop',
        //     // chromeMediaSourceId: source.id,
        //     minWidth: width,
        //     maxWidth: width,
        //     minHeight: height,
        //     maxHeight: height
        //   }
        // }
      });
    } catch (ex) {
      errors.push(ex);
      return null;
    }
  }

  if (errors.length) {
    if (!stream) {
      throw errors[errors.length - 1];
    }
  }

  return stream;
}
async function takeScreenshotCanvas() {
  const stream = await takeScreenshotStream();
  if (!stream) {
    return null;
  }

  // from: https://stackoverflow.com/a/57665309/5221762
  const video = document.createElement('video');
  const result = await new Promise((resolve, reject) => {
    video.onloadedmetadata = () => {
      video.play();
      video.pause();

      // from: https://github.com/kasprownik/electron-screencapture/blob/master/index.js
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      // see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      resolve(canvas);
    };
    video.srcObject = stream as MediaProvider;
  });

  stream?.getTracks().forEach(function (track: any) {
    track.stop();
  });

  if (result == null) {
    throw new Error('Cannot take canvas screenshot');
  }

  return result;
}

export { takeScreenshotCanvas };
