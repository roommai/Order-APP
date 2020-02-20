<template>
  <div class="top">
    <div>
      <img src="~assets/img/login_reg/login_logo_img.png" class="logo">
    </div>
    <p>欢迎登录海底捞</p>
    <div class="vip">
      <img src="~assets/img/login_reg/red_box.png" class="red_box"><span>成为会员尊享更多权益</span>
    </div>
  </div>
</template>

<script>
export default {
 
}
</script>

<style scoped >
  .top{
    display: flex;
    flex-direction: column;
    margin:25px 0 25px 0;
  }
    .logo{
      width:50px;
      height:50px;
    }
    p{
      font-size:15px;
      margin:5px 0;
    }
    .vip{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .red_box{
      width:15px;
      height:15px;
    }
    span{
      margin-left:3px;
      font-size:10px;
    }
    
  
</style>