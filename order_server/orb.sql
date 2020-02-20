#设置客户端连接服务器端编码
SET NAMES UTF8;
#如果存在，先丢弃
DROP DATABASE IF EXISTS orb;
#创建数据库，设置编码
CREATE DATABASE orb CHARSET=UTF8;
#进入创建的数据库
USE orb;

#建表 user
CREATE TABLE user (
    id  INT PRIMARY KEY AUTO_INCREMENT, #唯一id
    phone VARCHAR(11) UNIQUE,           #手机号
    upwd VARCHAR(60),                   #登录密码
    uname VARCHAR(12),                  #用户昵称
    sex BOOL DEFAULT 1,                 #性别，默认为男
    real_name VARCHAR(6),               #真实姓名
    salary VARCHAR(10),                 #收入范围
    birthday DATE,                      #生日
    city VARCHAR(20),                   #城市
    email VARCHAR(32),                  #邮箱
    say VARCHAR(64),                    #个性签名
    user_img VARCHAR(60) default '/images/user/default.png'               #用户头像
);
#修改自增列的起始值
ALTER TABLE user AUTO_INCREMENT=10000;


#建表 会员卡
CREATE TABLE vip (
    vip_id INT PRIMARY KEY AUTO_INCREMENT,                  #会员卡号码
    vip_area INT DEFAULT 86,                                #注册区域
    vip_regTime DATETIME NULL DEFAULT CURRENT_TIMESTAMP,    #注册时间
    vip_money INT DEFAULT 0,                                #捞币
    vip_value INT DEFAULT 0,                                #成长值
    u_id INT NOT NULL,
    FOREIGN KEY(u_id) REFERENCES user (id)
);
#会员卡id起始值
ALTER TABLE vip AUTO_INCREMENT=100000;

#社区帖子
CREATE TABLE posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,                 
    label VARCHAR(16) DEFAULT "跨年你想和谁过",
    content TEXT NOT NULL,
    post_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    origin VARCHAR(12) DEFAULT "最新",
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    images VARCHAR(1000),
    u_id INT,
    FOREIGN KEY(u_id) REFERENCES user (id)
);

#关注列表
CREATE TABLE follow (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    follow INT,
    be_followed INT,
    FOREIGN KEY(follow) REFERENCES user (id),
    FOREIGN KEY(be_followed) REFERENCES user (id)
);

#首页轮播图一
CREATE TABLE carousel_index1 (
    img_url VARCHAR(64)
);

insert into carousel_index1 values('/images/index/banner1.jpg');
insert into carousel_index1 values('/images/index/banner2.jpg');
insert into carousel_index1 values('/images/index/banner3.jpg');
insert into carousel_index1 values('/images/index/banner4.jpg');

#首页轮播图二
CREATE TABLE carousel_index2 (
    img_url VARCHAR(64)
);

insert into carousel_index2 values('/images/index/1.png');
insert into carousel_index2 values('/images/index/2.png');
insert into carousel_index2 values('/images/index/3.png');
insert into carousel_index2 values('/images/index/4.png');


#首页商品
CREATE TABLE product_index (
    product_id INT,
    description VARCHAR(64),
    price INT,
    img_url VARCHAR(64),
    sold INT
);

insert into product_index values(1,'海底捞口袋坚果1盒375克',1380,'/images/index/shop1.png',6719);
insert into product_index values(2,'小龙虾1盒装 6~8钱/只',3999,'/images/index/shop2.png',23);
insert into product_index values(3,'海底捞 手做牛油火锅底料',1249,'/images/index/shop3.png',374);
insert into product_index values(4,'海底捞创意环保帆布购物袋',580,'/images/index/shop4.png',1164);

#社区轮播图
CREATE TABLE community_carousel(
    img_url VARCHAR(64)
);

insert into community_carousel values('/images/community/banner1.png');
insert into community_carousel values('/images/community/banner2.png');
insert into community_carousel values('/images/community/banner3.png');

#会员轮播图
CREATE TABLE member_carousel(
    img_url VARCHAR(64)
);

insert into member_carousel values('/images/member/carousel/banner1.png');
insert into member_carousel values('/images/member/carousel/banner2.png');
insert into member_carousel values('/images/member/carousel/banner3.png');
insert into member_carousel values('/images/member/carousel/banner4.png');


#店名
CREATE TABLE shops(
 shop_id INT PRIMARY KEY AUTO_INCREMENT,
 shop_name VARCHAR(32),                 
 businesses VARCHAR(64),                
 open_time VARCHAR(32),          
 distance INT,                          
 shop_add VARCHAR(12), 
 shop_address VARCHAR(64), 
 shop_img VARCHAR(64)
);

insert into shops values (null,'富力海珠城店','正在营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区江南大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'江南西海珠城店','未营业','上午10:00-次日凌晨7:00',3,'西昌/西村','广东省广州市海珠区江南西大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'嘉和望岗海珠城店','正在营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区江南大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'林和西海珠城店','未营业','上午10:00-次日凌晨7:00',2,'西昌/西村','广东省广州市海珠区嘉和望岗大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'体育西路海珠城店','正在营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区体育西路大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'天河城海珠城店','正在营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区天河城大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'菊树海珠城店','正在营业','上午10:00-次日凌晨7:00',5,'西昌/西村','广东省广州市海珠区菊树大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'市二宫海珠城店','未营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区市二宫大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'北京路海珠城店','正在营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区北京路大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'芳村海珠城店','正在营业','上午10:00-次日凌晨7:00',5,'西昌/西村','广东省广州市海珠区芳村大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'上下九海珠城店','未营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区上下九大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'公园前海珠城店','正在营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区公园前大道中180号富力海珠城',"/images/shop/logo.png");
insert into shops values (null,'天河南海珠城店','正在营业','上午10:00-次日凌晨7:00',4,'西昌/西村','广东省广州市海珠区天河南大道中180号富力海珠城',"/images/shop/logo.png");



insert into user (phone,upwd,uname,sex,say,user_img) values('15779768060',md5('abc123456'),"LLin_f钧",0,"好好吃饭睡觉！","/images/user/1.jpg");
insert into vip (u_id) values (10000);

insert into user (phone,upwd,uname,sex,say,user_img) values('18100000000',md5('abc123456'),"Lonmen",1,"","/images/user/2.jpg");
insert into vip (u_id) values (10001);

insert into user (phone,upwd,uname,sex,say,user_img) values('18100000001',md5('abc123456'),"杏仁的苦",0,"愿好运连连","/images/user/3.jpg");
insert into vip (u_id) values (10002);

insert into user (phone,upwd,uname,sex,say,user_img) values('18100000002',md5('abc123456'),"星星不说话",0,"做一个精致的居居女孩","/images/user/4.jpg");
insert into vip (u_id) values (10003);

insert into posts values(null,"新年愿望","上联：年年顺景锟斤拷\r\n下联：岁岁平安烫烫烫\r\n横批： 屯屯锘锘 ",CURRENT_TIMESTAMP,default,999,666,"[\"/images/posts/fcd.png\"]",10000);
insert into posts values(null,"跨年你想和谁过","今年我要自己去吃海底捞跨年！\r\n我要奖励自己吃两个1/4锅\r\n一个番茄一个三鲜\r\n嘻嘻嘻 希望2020年我会越来越好",CURRENT_TIMESTAMP,default,31,4,"[\"/images/posts/1.jpg\"]",10000);
insert into posts values(null,"跨年你想和谁过","当然是家人啦！带父母和妹妹一起吃火锅呀！\r\n要有酒有肉",CURRENT_TIMESTAMP,default,9,1,"[\"/images/posts/2.jpg\",\"/images/posts/2_1.jpg\",\"/images/posts/2_2.jpg\"]",10001);
insert into posts values(null,"最想实现的新年愿望","2020希望带着爸爸妈妈出去旅游，宝宝健康成长~老公事业顺遂，全家及亲朋好友身体健康，开心每一天……",CURRENT_TIMESTAMP,default,8,0,"[\"/images/posts/3.jpg\"]",10002);
insert into posts values(null,"最想实现的新年愿望","和男朋友连续五年一起跨年了，今年约定要一块，吃海底捞的捞派滑牛，抖抖面筋球，小酥肉。",CURRENT_TIMESTAMP,default,6,0,"[\"/images/posts/4.jpg\",\"/images/posts/4_1.jpg\",\"/images/posts/4_2.jpg\",\"/images/posts/4_3.jpg\"]",10003);
insert into posts values(null,
        "跨年你想跟谁过",
        "今日打卡上海40店③③宝山太阳城店！很少女心
的一家店③③S很粉爱了爱了！锅底好像可以私人
|订制！下次还会再来的！",
        CURRENT_TIMESTAMP,
        default,
        387,
        240,
        "[\"/images/posts/5_1.jpg\",\"/images/posts/5_2.jpg\",\"/images/posts/5_3.jpg\",\"/images/posts/5_4.jpg\",\"/images/posts/5_5.jpg\"]",
        10003);



insert into posts values(null,
        "开启吃货模式",
        "想一起倒数跨
年的人，一定是你很喜欢的人吧？
带话题#跨年你想跟谁过#发帖，迎接充满希望的20
年吧。12.31日选2个小伙伴，送上30元约会代金券
呦~",
        CURRENT_TIMESTAMP,
        default,
        120,
        98,
        "[\"/images/posts/6_1.jpg\",\"/images/posts/6_2.jpg\",\"/images/posts/6_3.jpg\"]",
        10003);

insert into posts values(null,
        "解辣应该喝什么",
        "豆浆乳酸菌番茄汤！吃完加辣加
麻的牛油锅煮的东西再来几口番茄锅煮的肉配上海底
捞特色蘸料太美了！哇哇哇给自己说馋了，周末就去",
        CURRENT_TIMESTAMP,
        default,
        753,
        452,
        "[\"/images/posts/7_1.jpg\",\"/images/posts/7_2.jpg\",\"/images/posts/7_3.jpg\"]",
        10003);


insert into posts values(null,
        "今天的心情",
        "吃饭前心里闷闷不乐，出来开心得起飞，海底捞良心
企业，以后在家自己做，在外就吃海底捞！海底捞加
油",
        CURRENT_TIMESTAMP,
        default,
        153,
        35,
        "[\"/images/posts/8_1.jpg\",\"/images/posts/8_2.jpg\",\"/images/posts/8_3.jpg\",\"/images/posts/8_4.jpg\"]",
        10002);


insert into posts values(null,
        "跨年你想跟谁过",
        "和男朋友and他的室友！
有点小紧张哈哈，跨年之前就开始筹划怎么完美地过
元旦，大家都很用心够
刚刚大家又一起讨论决定当天要吃火锅哈哈",
        CURRENT_TIMESTAMP,
        default,
        650,
        325,
        "[\"/images/posts/9_1.jpg\",\"/images/posts/9_2.jpg\"]",
        10000);


insert into posts values(null,
        "APP优化建议",
        "海底捞App优化跟建议我都写图片里
面了！各位看了有什么建议没有写到的可以加在评
论下方
为了让官方可以看见所以我要利用一下bug",
        CURRENT_TIMESTAMP,
        default,
        576,
        324,
        "[\"/images/posts/10_1.jpg\",\"/images/posts/10_2.jpg\"]",
        10000);


insert into posts values(null,
        "跨年你想跟谁过~",
        "想一起倒数跨
年的人，一定是你很喜欢的人吧？
带话题#跨年你想跟谁过#发帖，迎接充满希望的20
年吧。12.31日选2个小伙伴，送上30元约会代金券
呦",
        CURRENT_TIMESTAMP,
        default,
        150,
        32,
        "[\"/images/posts/11_1.jpg\",\"/images/posts/11_2.jpg\"]",
        10002);



insert into posts values(null,
        "跨年你想和谁一起过",
        "今年我准备自己过，嘻嘻嘻希望2020年我会越来越好",
        CURRENT_TIMESTAMP,
        default,
        350,
        86,
        "[\"/images/posts/12_1.jpg\",\"/images/posts/12_2.jpg\"]",
        10001);



insert into posts values(null,
        "一句话总结2019",
        "2019我最开心的事就是得到了小 嗨和蘑菇抱枕！让我的小窝多了这两位新客！开心可 以抱着小嗨笑！不开心可以抱着小嗨哭！谢谢海底捞 赠送的蘑菇。",
        CURRENT_TIMESTAMP,
        default,
        125,
        21,
       "[\"/images/posts/13_1.jpg\",\"/images/posts/13_2.jpg\",\"/images/posts/13_3.jpg\",\"/images/posts/13_4.jpg\",\"/images/posts/13_5.jpg\",\"/images/posts/13_6.jpg\",\"/images/posts/13_7.jpg\",\"/images/posts/13_8.jpg\"]",
        10003);



insert into posts values(null,
        "新人来了",
        "每次小朋友来海底捞第一句都会 找小马叔叔，也非常喜欢海底捞，感觉自己每天都过 爱，稚嫩的喊着小马叔叔还有糖果姐姐，可爱极了， 我将用心服务好每一位客人，我的分享，因为我喜欢 海底捞，更喜欢每一位客人服务",
        CURRENT_TIMESTAMP,
        default,
        1532,
        785,
        "[\"/images/posts/14_1.jpg\",\"/images/posts/14_2.jpg\"]",
        10003);




insert into posts values(null,
        "海底捞种草 海底捞种草榜单",
        "这个话题！可以分类别讨论个三 首先锅底：当你不知道今天想选择什么的时候，加浓 加番茄的番茄锅C位",
        CURRENT_TIMESTAMP,
        default,
        1354,
        452,
        "[\"/images/posts/15_1.jpg\",\"/images/posts/15_2.jpg\",\"/images/posts/15_3.jpg\",\"/images/posts/15_4.jpg\",\"/images/posts/15_5.jpg\",\"/images/posts/15_6.jpg\"]",
        10001);


insert into posts values(null,
        "海底捞的服务员",
        "服务员小哥拉面贼帅",
        CURRENT_TIMESTAMP,
        default,
        423,
        120,
        "[\"/images/posts/16_1.jpg\",\"/images/posts/16_2.jpg\",\"/images/posts/16_3.jpg\",\"/images/posts/16_4.jpg\",\"/images/posts/16_5.jpg\",\"/images/posts/16_6.jpg\"]",
        10003);



insert into posts values(null,
        "最想在海底捞吃到什么",
        "极致海鲜享受之帝王蟹~ ，然后在海底捞成功解锁小包鱼、就鱼须和冻虾，目 前最想尝试的就是帝王蟹了，善于处理海鲜的海底捞 一定可以做出最美味的味道色 今天和爸妈的午餐，3个人花了63元，人均21。每天 乐此不疲地玩游戏赚捞币、分享心得、参与活动，尤 |太难不品-念婴之就一口一M-品L一AC 么搞活动不会赔本吗，服务员说正因为这样所以吸引 更多人来海底捞呀",
        CURRENT_TIMESTAMP,
        default,
        785,
        253,
        "[\"/images/posts/17_1.jpg\",\"/images/posts/17_2.jpg\"]",
        10003);



insert into posts values(null,
        "会跳舞的捞面",
        "爱点捞面，不只是因为好吃，更因 为捞面的过程极具观赏性，每次都会吸引方圆5米的 这是我遇到的两个让人印象深刻的捞面小哥，一个特 别帅，一个特别喜庆?",
        CURRENT_TIMESTAMP,
        default,
        246,
        95,
        "[\"/images/posts/18_1.jpg\"]",
        10003);




insert into posts values(null,
        "美甲",
        "抑ck美甲新款式仙气爆棚的需疆蓝美甲，这个夏天 我正式宣布，我的魂已经被这款美甲勾走了。 检上无品签一品一福和局，配一要一的兴第。一如在 心水！优雅女人必备！仙女缩猪必备！",
        CURRENT_TIMESTAMP,
        default,
        452,
        130,
        "[\"/images/posts/19_1.jpg\"]",
        10001);

insert into posts values(null,
        "生日",
        "12.17的生日想问海底捞生日有蛋糕送吗",
        CURRENT_TIMESTAMP,
        default,
        132,
        32,
        "[\"/images/posts/20_1.jpg\"]",
        10000);