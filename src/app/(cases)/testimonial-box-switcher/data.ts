export const testimonials = [
  {
    playlistName: '夜雨中的独白',
    description: '用旋律抚慰深夜未眠的灵魂',
    photo:
      'https://music-file.y.qq.com/songlist/u/oicq7w4ioi6Aov/b331/b8d0424547d82c558f8135f1447f3c6cc5eaf0f3_2e102a.jpg?imageView2/4/w/300/h/300',
    text: "当雨滴敲打窗棂的夜晚，这个歌单像一封未寄出的信，收藏着所有说不出口的遗憾。从钢琴独奏到弦乐低吟，每首曲子都带着潮湿的思念，那些旋律在耳畔重复着'如果当时'的假设。特别推荐Track 07《记忆的折痕》，当大提琴响起时，你会明白有些疼痛美得让人舍不得痊愈。"
  },
  {
    playlistName: '褪色明信片',
    description: '泛黄记忆里的声音标本',
    photo:
      'https://music-file.y.qq.com/songlist/u/oKo57w6z7evq7v/6bc3/a859a02adf75ed55486c933882fcbf79cd322163_2399f6.jpg?imageView2/4/w/300/h/300',
    text: '黑胶质感的声线里藏着上世纪的情书，那些被岁月模糊的歌词突然在某句转音里变得锋利。这个歌单收录了15首带着轻微电流杂音的经典，当《旧日邮戳》的女声在3分22秒突然哽咽时，你会想起某个早已忘记面容的人。建议在黄昏时分配合老照片共同服用，副作用是可能引发持续性的温柔心绞痛。'
  },
  {
    playlistName: '止痛药过期了',
    description: '比孤独更安静的陪伴',
    photo: 'https://y.qq.com/music/photo_new/T002R300x300M000004b4y530XXet4_1.jpg?max_age=2592000',
    text: "当医生说'时间会治愈一切'时，他一定没听过这个歌单。从北欧冷冽的民谣到东京地下室的demo录音，18首歌像18个没有愈合的伤口。主打曲《星期三的解剖课》用手术刀般的吉他分解着回忆，而《404号病房》的呼吸声采样会让你在凌晨三点检查自己的心跳。警告：本歌单可能加剧失眠症状。"
  },
  {
    playlistName: '候鸟的遗书',
    description: '写给不会归来之人的挽歌',
    photo: 'https://y.qq.com/music/photo_new/T002R300x300M000003YmKzC2fqNpc_1.jpg?max_age=2592000',
    text: '迁徙的鸟类永远不会知道，有人在地面用整个冬天记录它们羽翼振动的声音。这个歌单是献给所有单向思念的安魂曲，特别是《羽绒被里的南极》中那段失真的电台对白，以及《信天翁的葬礼》里持续4分30秒的心跳监测仪音效。最适合在12月到次年2月循环播放，直到把悲伤腌制成习惯。'
  },
  {
    playlistName: '悲伤立体声',
    description: '左耳告别，右耳重逢',
    photo: 'https://y.qq.com/music/photo_new/T002R300x300M000001BhTDa1gUEPw_1.jpg?max_age=2592000',
    text: '戴上耳机，让痛苦变得高清。这个歌单精心设计了声场定位，左声道的雨声总是比右声道的钢琴快0.5秒，就像回忆永远追不上现实。《耳鸣》里不断重复的求救摩斯密码，《心电图谐波》里逐渐消失的合唱，都在诠释着最残酷的立体声定律——两个声道永远无法真正相拥。建议连续收听不超过3遍，否则可能产生幻听。'
  },
  {
    playlistName: '眼泪的沸点',
    description: '在100℃时悲伤开始汽化',
    photo: 'https://y.qq.com/music/photo_new/T002R300x300M000004IutRG2O0ixn_1.jpg?max_age=2592000',
    text: '当室内温度达到28℃，这个歌单会成为最危险的易燃物。收录了12首在极端情绪下录制的作品，从《夏日溺亡事件》的溺水混响，到《灼烧标本》里真正用火焰烧毁母带时的爆裂声。主打歌《液态记忆》的副歌部分，歌手的声音确实在40℃高温录音棚中逐渐融化。警告：本歌单可能引发体温升高、瞳孔扩散等生理反应。'
  },
  {
    playlistName: '冰河纪情书',
    description: '一万年前的告白刚刚抵达',
    photo: 'https://y.qq.com/music/photo_new/T002R300x300M000004d4yXr3zkWZ7_1.jpg?max_age=2592000',
    text: '考古学家在冰川里发现了一盒被压扁的磁带，这是它复原后的歌单。那些因低温而变形的音高，那些因年代久远突然跳帧的告白，构成了最漫长的延时回声。特别推荐《地质层的晚安曲》，实际是用地震波数据转换成的旋律，而《化石情话》里歌手故意在-30℃环境下演唱以获得颤抖的声线。适合作为分手后第一个冰河纪的背景音乐。'
  }
]

export type Testimonial = (typeof testimonials)[number]
