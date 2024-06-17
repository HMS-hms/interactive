<template>
<!--    <div>-->
<!--      <button @click="demoShow">展示demo</button>-->
<!--    </div>-->
<!--    图片展示-->
  <el-container>
    <div class="mainPanel">
      <div class="select-panel">
        <div style="padding-top: 90px; margin-left:8px; margin-right:8px">
          <div>
            人物
          </div>
          <div style="text-align: left">
            性别：
            <a @click="sex_clik1" style="padding-right: 45px;">
              <el-radio v-model="sex" label="男" >男</el-radio>
            </a>
            <a @click="sex_clik2">
              <el-radio v-model="sex" label="女">女</el-radio>
            </a>
          </div>
          <div style="text-align: left">
            年龄：
            <a @click="age_clik1"  style="padding-right: 30px;">
              <el-radio v-model="age" label="小孩">小孩</el-radio>
            </a>
            <a @click="age_clik2" style="padding-right: 30px;">
              <el-radio v-model="age" label="成年人">成年人</el-radio>
            </a>
            <a @click="age_clik3">
              <el-radio v-model="age" label="老年人">老年人</el-radio>
            </a>
          </div>
          <div style="text-align: left">
            发色：
            <a @click="hair_clik1"  style="padding-right: 30px;">
              <el-radio v-model="hair_color" label="黑色">黑色</el-radio>
            </a>
            <a @click="hair_clik2" style="padding-right: 43px;">
              <el-radio v-model="hair_color" label="金色">金色</el-radio>
            </a>
            <a @click="hair_clik3">
              <el-radio v-model="hair_color" label="褐色">褐色</el-radio>
            </a>
          </div>
          <br>
          <div>
            猫
          </div>
          <div style="text-align: left">
            颜色：
            <a @click="cat_clik1"  style="padding-right: 30px;">
              <el-radio v-model="cat_color" label="黄色">黄色</el-radio>
            </a>
            <a @click="cat_clik2" style="padding-right: 43px;">
              <el-radio v-model="cat_color" label="黑色">黑色</el-radio>
            </a>
            <a @click="cat_clik3">
              <el-radio v-model="cat_color" label="白色">白色</el-radio>
            </a>
            <!--        <a @click="cat_clik4">-->
            <!--          <el-radio v-model="cat_color" label="黑白相间">黑白相间</el-radio>-->
            <!--        </a>-->
          </div>
          <br>
          <div>
            狗
          </div>
          <div style="text-align: left">
            颜色：
            <a @click="dog_color_clik1"  style="padding-right: 30px;">
              <el-radio v-model="dog_color" label="黄色">黄色</el-radio>
            </a>
            <a @click="dog_color_clik2" style="padding-right: 43px;">
              <el-radio v-model="dog_color" label="黑色">黑色</el-radio>
            </a>
            <a @click="dog_color_clik3">
              <el-radio v-model="dog_color" label="白色">白色</el-radio>
            </a>
          </div>
          <div style="text-align: left">
            体型：
            <a @click="dog_form_clik1"  style="padding-right: 30px;">
              <el-radio v-model="dog_form" label="小型">小型</el-radio>
            </a>
            <a @click="dog_form_clik2">
              <el-radio v-model="dog_form" label="大型">大型</el-radio>
            </a>
          </div>
        </div>
      </div>
      <div class="chat-container">
        <div class="messages" ref="messageContainer">
          <div class="message-card" v-for="picture in pictureList" :key="picture.id">
            <el-image class="img" :src="picture.src" alt="none"></el-image>
          </div>
        </div>

        <div class="input-area">
          <button @click="startMic">{{ micOpen ? '确认' : '开始录音' }}</button>
          <textarea v-model="speechResult" placeholder="语音识别结果"></textarea>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import Recorder from 'js-audio-recorder';
import axios from "axios";

export default {
  name: 'ChildView',
  data() {
    return {
      pictureList: [],
      micOpen: false,
      chunk: null,
      speechResult: '', // 语音识别结果
      emotionResult: '', // 情绪识别结果[pessimistic（负向情绪）、neutral（中性情绪）、optimistic（正向情绪]
      history: [],
      sex:'',
      age:'',
      hair_color:'',
      cat_color:'',
      dog_color:'',
      dog_form:''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  methods: {
    sex_clik1(){
      if(this.sex==='男'){
        setTimeout(() => {
          this.sex=''
        }, 10);
      }
    },
    sex_clik2(){
      if(this.sex==='女'){
        setTimeout(() => {
          this.sex=''
        }, 10);
      }
    },
    age_clik1(){
      if(this.age==='小孩'){
        setTimeout(() => {
          this.age=''
        }, 10);
      }
    },
    age_clik2(){
      if(this.age==='成年人'){
        setTimeout(() => {
          this.age=''
        }, 10);
      }
    },
    age_clik3(){
      if(this.age==='老年人'){
        setTimeout(() => {
          this.age=''
        }, 10);
      }
    },
    hair_clik1(){
      if(this.hair_color==='黑色'){
        setTimeout(() => {
          this.hair_color=''
        }, 10);
      }
    },
    hair_clik2(){
      if(this.hair_color==='金色'){
        setTimeout(() => {
          this.hair_color=''
        }, 10);
      }
    },
    hair_clik3(){
      if(this.hair_color==='褐色'){
        setTimeout(() => {
          this.hair_color=''
        }, 10);
      }
    },
    cat_clik1(){
      if(this.cat_color==='黄色'){
        setTimeout(() => {
          this.cat_color=''
        }, 10);
      }
    },
    cat_clik2(){
      if(this.cat_color==='黑色'){
        setTimeout(() => {
          this.cat_color=''
        }, 10);
      }
    },
    cat_clik3(){
      if(this.cat_color==='白色'){
        setTimeout(() => {
          this.cat_color=''
        }, 10);
      }
    },
    dog_color_clik1(){
      if(this.dog_color==='黄色'){
        setTimeout(() => {
          this.dog_color=''
        }, 10);
      }
    },
    dog_color_clik2(){
      if(this.dog_color==='黑色'){
        setTimeout(() => {
          this.dog_color=''
        }, 10);
      }
    },
    dog_color_clik3(){
      if(this.dog_color==='白色'){
        setTimeout(() => {
          this.dog_color=''
        }, 10);
      }
    },
    dog_form_clik1(){
      if(this.dog_form==='小型'){
        setTimeout(() => {
          this.dog_form=''
        }, 10);
      }
    },
    dog_form_clik2(){
      if(this.dog_form==='大型'){
        setTimeout(() => {
          this.dog_form=''
        }, 10);
      }
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
    sendReq(prompt){
      const formData = new FormData();
      formData.append('prompt',prompt);
      axios.post('/generate_picture',formData,{ responseType: "blob" }).then((res) => {
        // console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        console.log(url);
        this.pictureList.push({src:url,id:this.pictureList.length});
        // console.log(this.pictureList)
      })
    },
    demoShow(){
      const texts=this.prestory.split(/(?<=[.!?。！？\n])\s+/);
      for (let i=0; i<1; i++){
        this.sendReq(texts[i]);
      }

    },
    startMic() {
      this.micOpen = !this.micOpen;
      if (this.micOpen) {
        const recorder = new Recorder({sampleRate: 16000});
        recorder.start().then(() => {
          // 开始录音
          console.log('开始录音');
          this.chunk = recorder;
        }, (error) => {
          // 出错了
          console.log(`${error.name} : ${error.message}`);
        });
      } else {
        const blob = this.chunk.getPCMBlob();
        const file = new File([blob], 'mic', {type: 'audio/pcm', lastModified: Date.now()});
        const reader = new FileReader();
        reader.onload = (evt) => {
          const base64 = evt.target.result;
          // const emotion_access_token = "24.0f37f8647d43d9e2aa55a01e6659f524.2592000.1719398210.282335-75044811"

          const speech_data = {
            format: 'pcm',
            rate: 16000,
            dev_pid: 1537,
            channel: 1,
            token: '24.a4e936ad7e6803a85db6908aa6795b59.2592000.1719396766.282335-74788498',
            cuid: 'baidu_workshop',
            len: file.size,
            speech: base64.substring(37)
          };

          // 百度api调用
          // 语音识别
          axios.post('/baidu_api_speech', speech_data).then((res) => {
            if (res.data.result[0] !== '我不知道。') {
              console.log(res.data.result[0]);
              this.speechResult = res.data.result[0];
              this.confirmSpeech()
              // const emotion_data = {
              //   text: this.speechResult
              // }
              //
              // // 情绪识别
              // axios.post('/baidu_api_emotion?charset=UTF-8&access_token=' +
              //     emotion_access_token, emotion_data).then((res) => {
              //       if (res.data['items'] !== undefined) {
              //         console.log(res.data.items[0].label)
              //         this.emotionResult = res.data.items[0].label;
              //       }
              // })
            }
          });
        };
        reader.readAsDataURL(blob);
        this.chunk.destroy().then(() => {
          this.chunk = null;
        });
      }
    },
    assembleCharacter(){
      let character='';
      if(this.age !== '' || this.sex!=='' || this.hair_color!==''){
        let person_c='人物：\n';
        if(this.sex!==''){
          person_c+=('  性别：'+this.sex+'\n');
        }
        if(this.age !==''){
          person_c+=('  年龄：'+this.age+'\n');
        }
        if(this.hair_color!==''){
          person_c+=('  发色：'+this.hair_color+'\n');
        }
        character+=person_c;
      }
      if(this.cat_color !== ''){
        let cat_c='猫：\n';
        if(this.cat_color!==''){
          cat_c+=('  颜色：'+this.cat_color+'\n');
        }
        character+=cat_c;
      }
      if(this.dog_form !== '' || this.dog_form !== ''){
        let dog_c='狗：\n';
        if(this.dog_form!==''){
          dog_c+=('  体型：'+this.dog_form+'\n');
        }
        if(this.dog_color!==''){
          dog_c+=('  颜色：'+this.dog_color+'\n');
        }
        character+=dog_c;
      }
      return character;
    },
    assembleHistory(){
      let his = '';
      for(let i=0;i<this.history.length;i++){
        his+=(this.history[i]+'\n');
      }
      return his;
    },
    confirmSpeech() {
      // 确认语音识别结果
      console.log(this.speechResult)
      console.log(this.emotionResult)
      let prompt=''
      let character=this.assembleCharacter()
      if(character!==''){
        prompt+='以下为角色信息\n'
        prompt+=character
      }
      let his=this.assembleHistory()
      if(his!=='') {
        prompt += '以下为历史记录\n'
        prompt += his
      }
      prompt+='\n你需要针对以下内容进行图片生成:\n'
      prompt+=this.speechResult
      this.sendReq(prompt)
      this.history.push(this.speechResult)
    },
  },
  watch: {
    pictureList() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  }
}
</script>

<style scoped>
.mainPanel{
  display: flex;
  height: 80vh;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 600px;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}

.select-panel{
  display: flex;
  height: 80vh;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message-card {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

.img {
  max-width: 100%;
  width: auto;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.input-area {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
}
</style>
