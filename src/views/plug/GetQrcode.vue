<template>
  <div class="scaner">
    <a-spin :spinning="spinning" tip="扫码成功正在处理...">
      <div class="cover">
        <p class="line"></p>
        <p class="tips">将二维码放入框内，即可自动扫描</p>
      </div>
      <video
        v-show="showPlay"
        class="source"
        ref="videoRef"
        :width="videoWH.width"
        :height="videoWH.height"
      ></video>
      <canvas v-show="!showPlay" ref="canvasRef" />
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted,onUnmounted,onBeforeUnmount } from "vue";
import jsQR from "jsqr";

const showPlay = ref(true);
const spinning = ref(false);
const canvas = ref();
const videoWH = reactive({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight - 48,
})
const canvasRef = ref();
const videoRef = ref();
const emits = defineEmits();
  onMounted(() => {
    spinning.value = false;
    setup();
  })
   // 画线
    const drawLine = (begin, end) => {
      canvas.value.beginPath();
      canvas.value.moveTo(begin.x, begin.y);
      canvas.value.lineTo(end.x, end.y);
      canvas.value.lineWidth = 2;
      canvas.value.strokeStyle = "#03C03C";
      canvas.value.stroke();
    }
    // 画框
    const drawBox = (location) => {
      drawLine(location.topLeftCorner, location.topRightCorner);
      drawLine(location.topRightCorner, location.bottomRightCorner);
      drawLine(location.bottomRightCorner, location.bottomLeftCorner);
      drawLine(location.bottomLeftCorner, location.topLeftCorner);
    }
    const tick = () => {
      canvasRef.value.height = videoWH.height;
      canvasRef.value.width = videoWH.width;
      canvas.value.drawImage(
        videoRef.value,
        0,
        0,
        canvasRef.value.width,
        canvasRef.value.height
      );
      const imageData = canvas.value.getImageData(
        0,
        0,
        canvasRef.value.width,
        canvasRef.value.height
      );
      let code = false;
      try {
        code = jsQR(imageData.data, imageData.width, imageData.height);
      } catch (e) {
        console.error(e);
      }
      if (code) {
        drawBox(code.location);
        found(code.data);
      }
      run();
    }

    const handleSuccess = (stream) => {
      if (videoRef.value.srcObject !== undefined) {
        videoRef.value.srcObject = stream;
      } else if (window.videoEl.mozSrcObject !== undefined) {
        videoRef.value.mozSrcObject = stream;
      } else if (window.URL.createObjectURL) {
        videoRef.value.src = window.URL.createObjectURL(stream);
      } else if (window.webkitURL) {
        videoRef.value.src = window.webkitURL.createObjectURL(stream);
      } else {
        videoRef.value.src = stream;
      }
      videoRef.value.playsInline = true;
      const playPromise = videoRef.value.play();
      playPromise.catch(() => (showPlay.value = true));
      playPromise.then(run());
    }
    // 初始化
    const setup = () => {
     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        canvas.value = canvasRef.value.getContext("2d");
        const facingMode = { exact: "environment" };
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode } })
          .then((res) => {
            handleSuccess(res)
          })
          .catch((res) => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((res) => {
                handleSuccess(res)
              })
              .catch((error) => {
                emits("errorCaptured", error);
              });
          });
      }
    }
    const run = () => {
      requestAnimationFrame((res) => {
        tick(res)
      });
    }
    const found = (code) => {
      emits("codeScanned", code);
    }
    // 完全停止
    const fullStop = () => {
      // if (videoRef.value && videoRef.value.srcObject) {
      // }
      videoRef.value.srcObject.getTracks().forEach((t) => t.stop());

    }
    onBeforeUnmount(() =>{
    console.log("6665556")
      fullStop()
    })
    
    onUnmounted(() =>{
      console.log("6666")
      fullStop()
    })
</script>
<style lang="css" scoped>
.scaner {
  background: #000000;
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  height: 100%;
  height: calc(100% - 48px);
  z-index: 1000;
}

.scaner .cover {
  height: 400px;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0.5px solid #999999;
  z-index: 1111;
}
.scaner .cover .line {
  width: 380px;
  height: 1px;
  margin-left: 10px;
  background: #5f68e8;
  background: linear-gradient(
    to right,
    transparent,
    #5f68e8,
    #0165ff,
    #5f68e8,
    transparent
  );
  position: absolute;
  animation: scan 1.75s infinite linear;
  animation-fill-mode: both;
  border-radius: 1px;
}

.scaner .cover .tips {
  position: absolute;
  bottom: -48px;
  width: 100%;
  font-size: 14px;
  color: #ffffff;
  opacity: 0.8;
}
@keyframes scan {
  0% {
    top: 0;
  }
  25% {
    top: 100px;
  }
  50% {
    top: 200px;
  }
  75% {
    top: 300px;
  }
  100% {
    top: 400px;
  }
}
</style>