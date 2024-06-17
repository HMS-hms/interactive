<template>
<!--    <div>-->
<!--      <button @click="demoShow">展示demo</button>-->
<!--    </div>-->
<!--    图片展示-->
  <el-container>
    <el-aside>
      <div style="padding-top: 90px">
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
    </el-aside>
    <el-main>
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
    </el-main>
  </el-container>
</template>

<script>
import Recorder from 'js-audio-recorder';
import axios from "axios";

export default {
  name: 'ChildView',
  data() {
    return {
      prestory: '　从前有个可爱的小姑娘，谁见了都喜欢，但最喜欢她的是她的奶奶，简直是她要什么就给她什么。一次，奶奶送给小姑娘一顶用丝绒做的小红帽，戴在她的头上正好合适。从此，姑娘再也不愿意戴任何别的帽子，于是大家便叫她“小红帽”。\n' +
          '\n' +
          '　　一天，妈妈对小红帽说：“来，小红帽，这里有一块蛋糕和一瓶葡萄酒，快给奶奶送去，奶奶生病了，身子很虚弱，吃了这些就会好一些的。趁着现在天还没有热，赶紧动身吧。在路上要好好走，不要跑，也不要离开大路，否则你会摔跤的，那样奶奶就什么也吃不上了。到奶奶家的时候，别忘了说‘早上好’，也不要一进屋就东瞧西瞅。”\n' +
          '\n' +
          '　　“我会小心的。”小红帽对妈妈说，并且还和妈妈拉手作保证。\n' +
          '\n' +
          '　　奶奶住在村子外面的森林里，离小红帽家有很长一段路。小红帽刚走进森林就碰到了一条狼。小红帽不知道狼是坏家伙，所以一点也不怕它。\n' +
          '\n' +
          '　　“你好，小红帽，”狼说。\n' +
          '\n' +
          '　　“谢谢你，狼先生。”\n' +
          '\n' +
          '　　“小红帽，这么早要到哪里去呀？”\n' +
          '\n' +
          '　　“我要到奶奶家去。”\n' +
          '\n' +
          '　　“你那围裙下面有什么呀？”\n' +
          '\n' +
          '　　“蛋糕和葡萄酒。昨天我们家烤了一些蛋糕，可怜的奶奶生了病，要吃一些好东西才能恢复过来。”\n' +
          '\n' +
          '　　“你奶奶住在哪里呀，小红帽？”\n' +
          '\n' +
          '　　“进了林子还有一段路呢。她的房子就在三棵大橡树下，低处围着核桃树篱笆。你一定知道的。”小红帽说。\n' +
          '\n' +
          '　　狼在心中盘算着：“这小东西细皮嫩肉的，味道肯定比那老太婆要好。我要讲究一下策略，让她俩都逃不出我的手心。”于是它陪着小红帽走了一会儿，然后说：“小红帽，你看周围这些花多么美丽啊！干吗不回头看一看呢？还有这些小鸟，它们唱得多么动听啊！你大概根本没有听到吧？林子里的一切多么美好啊，而你却只管往前走，就像是去上学一样。”\n' +
          '\n' +
          '　　小红帽抬起头来，看到阳光在树木间来回跳荡，美丽的鲜花在四周开放，便想：“也许我该摘一把鲜花给奶奶，让她高兴高兴。现在天色还早，我不会去迟的。”她于是离开大路，走进林子去采花。她每采下一朵花，总觉得前面还有更美丽的花朵，便又向前走去，结果一直走到了林子深处。\n' +
          '\n' +
          '　　就在此时，狼却直接跑到奶奶家，敲了敲门。\n' +
          '\n' +
          '　　“是谁呀？”\n' +
          '\n' +
          '　　“是小红帽。”狼回答，“我给你送蛋糕和葡萄酒来了。快开门哪。”\n' +
          '\n' +
          '　　“你拉一下门栓就行了，”奶奶大声说，“我身上没有力气，起不来。”\n' +
          '\n' +
          '　　狼刚拉起门栓，那门就开了。狼二话没说就冲到奶奶的床前，把奶奶吞进了肚子。然后她穿上奶奶的衣服，戴上她的帽子，躺在床上，还拉上了帘子。\n' +
          '\n' +
          '　　可这时小红帽还在跑来跑去地采花。直到采了许多许多，她都拿不了啦，她才想起奶奶，重新上路去奶奶家。\n' +
          '\n' +
          '　　看到奶奶家的屋门敞开着，她感到很奇怪。她一走进屋子就有一种异样的感觉，心中便想：“天哪！平常我那么喜欢来奶奶家，今天怎么这样害怕？”她大声叫道：“早上好！”，可是没有听到回答。她走到床前拉开帘子，只见奶奶躺在床上，帽子拉得低低的，把脸都遮住了，样子非常奇怪。\n' +
          '\n' +
          '　　“哎，奶奶，”她说，“你的耳朵怎么这样大呀？”\n' +
          '\n' +
          '　　“为了更好地听你说话呀，乖乖。”\n' +
          '\n' +
          '　　“可是奶奶，你的眼睛怎么这样大呀？”小红帽又问。\n' +
          '\n' +
          '　　“为了更清楚地看你呀，乖乖。”\n' +
          '\n' +
          '　　“奶奶，你的手怎么这样大呀？”\n' +
          '\n' +
          '　　“可以更好地抱着你呀。”\n' +
          '\n' +
          '　　“奶奶，你的嘴巴怎么大得很吓人呀？”\n' +
          '\n' +
          '　　“可以一口把你吃掉呀！”\n' +
          '\n' +
          '　　狼刚把话说完，就从床上跳起来，把小红帽吞进了肚子，狼满足了食欲之后便重新躺到床上睡觉，而且鼾声震天。\n' +
          '\n' +
          '　　一位猎人碰巧从屋前走过，心想：“这老太太鼾打得好响啊！我要进去看看她是不是出什么事了。”猎人进了屋，来到床前时却发现躺在那里的竟是狼。\n' +
          '\n' +
          '　　“你这老坏蛋，我找了你这么久，真没想到在这里找到你！”他说。\n' +
          '\n' +
          '　　他正准备向狼开枪，突然又想到，这狼很可能把奶奶吞进了肚子，奶奶也许还活着。猎人就没有开枪，而是操起一把剪刀，动手把呼呼大睡的狼的肚子剪了开来。他刚剪了两下，就看到了红色的小帽子。他又剪了两下，小姑娘便跳了出来，叫道：“真把我吓坏了！狼肚子里黑漆漆的。”接着，奶奶也活着出来了，只是有点喘不过气来。\n' +
          '\n' +
          '　　小红帽赶紧跑去搬来几块大石头，塞进狼的肚子。狼醒来之后想逃走，可是那些石头太重了，它刚站起来就跌到在地，摔死了。\n' +
          '\n' +
          '　　三个人高兴极了。猎人剥下狼皮，回家去了；奶奶吃了小红帽带来的蛋糕和葡萄酒，精神好多了；而小红帽却在想：“要是妈妈不允许，我一辈子也不独自离开大路，跑进森林了。”\n' +
          '\n' +
          '　　人们还说，小红帽后来又有一次把蛋糕送给奶奶，而且在路上又有一只狼跟她搭话，想骗她离开大路。可小红帽这次提高了警惕，头也不回地向前走。她告诉奶奶她碰到了狼，那家伙嘴上虽然对她说“你好”，眼睛里却露着凶光，要不是在大路上，它准把她给吃了。\n' +
          '\n' +
          '　　“那么，”奶奶说，“我们把门关紧，不让它进来。”\n' +
          '\n' +
          '　　不一会儿，狼真的一面敲着门一面叫道：“奶奶，快开门呀。我是小红帽，给你送蛋糕来了。”\n' +
          '\n' +
          '　　但是她们既不说话，也不开门。这长着灰毛的家伙围着房子转了两三圈，最后跳上屋顶，打算等小红帽在傍晚回家时偷偷跟在她的后面，趁天黑把她吃掉。可奶奶看穿了这家伙的坏心思。她想起屋子前有一个大石头槽子，便对小姑娘说：“小红帽，把桶拿来。我昨天做了一些香肠，提些煮香肠的水去倒进石头槽里。”\n' +
          '\n' +
          '　　小红帽提了很多很多水，把那个大石头槽子装得满满的。香肠的气味飘进了狼的鼻孔，它使劲地用鼻子闻呀闻，并且朝下张望着，到最后把脖子伸得太长了，身子开始往下滑。它从屋顶上滑了下来，正好落在大石槽中，淹死了。\n' +
          '\n' +
          '　　小红帽高高兴兴地回了家，从此再也没有谁伤害过她。',
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
      let his=this.assembleHistory()
      let prompt='以下为历史记录\n'
      prompt+=his
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
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 600px;
  margin: 0 auto;
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