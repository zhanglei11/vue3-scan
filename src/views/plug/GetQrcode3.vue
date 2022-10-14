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
<script>
import jsQR from "jsqr";
export default {
  data() {
    return {
      showPlay: true,
      spinning: false,
      canvas: "",
      videoWH: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 48,
      },
    };
  },
  methods: {
    // 画线
    drawLine(begin, end) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = 2;
      this.canvas.strokeStyle = "#03C03C";
      this.canvas.stroke();
    },
    // 画框
    drawBox(location) {
      this.drawLine(location.topLeftCorner, location.topRightCorner);
      this.drawLine(location.topRightCorner, location.bottomRightCorner);
      this.drawLine(location.bottomRightCorner, location.bottomLeftCorner);
      this.drawLine(location.bottomLeftCorner, location.topLeftCorner);
    },
    tick() {
      this.$refs.canvasRef.height = this.videoWH.height;
      this.$refs.canvasRef.width = this.videoWH.width;
      this.canvas.drawImage(
        this.$refs.videoRef,
        0,
        0,
        this.$refs.canvasRef.width,
        this.$refs.canvasRef.height
      );
      const imageData = this.canvas.getImageData(
        0,
        0,
        this.$refs.canvasRef.width,
        this.$refs.canvasRef.height
      );
      let code = false;
      try {
        code = jsQR(imageData.data, imageData.width, imageData.height);
      } catch (e) {
        console.error(e);
      }
      if (code) {
        this.drawBox(code.location);
        this.found(code.data);
      }
      this.run();
    },

    handleSuccess(stream) {
      console.log("stream", stream);
      if (this.$refs.videoRef.srcObject !== undefined) {
        this.$refs.videoRef.srcObject = stream;
      } else if (window.videoEl.mozSrcObject !== undefined) {
        this.$refs.videoRef.mozSrcObject = stream;
      } else if (window.URL.createObjectURL) {
        this.$refs.videoRef.src = window.URL.createObjectURL(stream);
      } else if (window.webkitURL) {
        this.$refs.videoRef.src = window.webkitURL.createObjectURL(stream);
      } else {
        this.$refs.videoRef.src = stream;
      }
      this.$refs.videoRef.playsInline = true;
      const playPromise = this.$refs.videoRef.play();
      playPromise.catch(() => (this.showPlay = true));
      playPromise.then(this.run());
    },
    // 初始化
    setup() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.canvas = this.$refs.canvasRef.getContext("2d");
        const facingMode = { exact: "environment" };
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode } })
          .then((res) => {
            this.handleSuccess(res);
          })
          .catch(() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((res) => {
                console.log("6666",res)
                this.handleSuccess(res);
              })
              .catch((error) => {
                this.$emit("error-captured", error);
              });
          });
      }
    },
    run() {
      requestAnimationFrame(this.tick);
    },
    found(code) {
      this.$emit("code-scanned", code);
    },
    // 完全停止
    fullStop() {
      if (this.$refs.videoRef && this.$refs.videoRef.srcObject) {
        this.$refs.videoRef.srcObject.getTracks().forEach((t) => t.stop());
      }
    },
  },
  mounted() {
    this.spinning = false;
    this.setup();
  },
  beforeDestroy() {
    this.fullStop();
  },
};
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
