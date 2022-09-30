// /**
// Job needs to do
//  * 1. Render songs 
//  * 2. Play / Pause / Seek 
//  * 3. CD rotate 
//  * 4. Next / Previous 
//  * 5. Show / Hide Playlist 
//  * 6. Random 
//  * 7. Next / Repeat when ended 
//  * 8. Active song 
//  * 9. Scroll active song into  
//  * 10. Play song when click 
//  * 11. Volumn 
//  * 12. Change tooltip 
//  */
//khởi tạo biến gán
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const PLAYERE_STORAGE='MUSIC'

const player=$('.player');
const cd=$('.cd_athumb');
const heading=$('header h2');
const cdthumd=$('.cd_authumd_css');
const audio=$('#audio');
const playBtn=$('.btn__play');
const progress=$('#progress');
const progressBar=$('.progress');
const nextBtn=$('.btn__next');
const preBtn=$('.btn__previous');
const randomBtn=$('.btn__random');
const Btnrepeat=$('.btn__repeat');
const volumeBtn=$('.volume');
const volumeBar=$('.volume-bar');
const volume=$('.volume-bar__value');
const progresstime=$('.progress-time__current-time');
const progressduration=$('.progress-time__duration');
const playlist_contains=$('.playlist_contains');
//khơi tạo object chứa link bài hát
const app={
    curentIndex:0,
    currenVolume:1,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    isMute:false,
    isHoldVolume:false,
    isHoldProgressBar:false,
    // đặt setting để lưu giá trị
    config:JSON.parse(localStorage.getItem(PLAYERE_STORAGE))||{},
    songs:[
        {
            name:'Naveda',
            author:'Vicetone ft. Cozi Zuehlsdorff',
            path:'./music/Nevada-Monstercat-6983746.mp3',
            image:'./img/Vicetone ft. Cozi Zuehlsdorff.jpg'
    
        },
        {
            name:'Kiss you remix',
            author:'Hung Bobi Remix',
            path:'./music/KissYouRemix-DJHungSex-3662694.mp3',
            image:'./img/Suzy2.jpg'
    
        },
        {
            name:'I need your love',
            author:'Nigthcore',
            path:'./music/Nightcore-I-Need-Your-Love-via-Naijafinix.com_.mp3',
            image:'./img/Nightcore-I-Need-Your-Love.jpg'
    
        },
        {
            name:'When Night Falls',
            author:'Monstercat',
            path:'./music/NhacTre.Org - When Night Falls.mp3',
            image:'./img/Monstercat.jpg'
    
        },
        {
            name:'PayPhone',
            author:'Alex G Jameson',
            path:'./music/PayphoneCover-AlexG-Jameson_4dmae.mp3',
            image:'./img/download.jpg'
    
        },
        {
            name:'Summertime (Sunshine)',
            author:'K-391',
            path:'./music/TaiBaiHat.Net - L2Joy66nFg81.mp3',
            image:'./img/K-391.jpg'
    
        },
        {
            name:'DJ DESA REMIX',
            author:'Lemon Tree',
            path:'./music/Lemon-Tree-Remix-Tiktok-DJ-DESA-Remix.mp3',
            image:'./img/lemontree.jpg'
    
        },
        {
            name:'Sugar',
            author:'Maroon 5',
            path:'./music/Sugar - Maroon 5 (NhacPro.net).mp3',
            image:'./img/maroon-5-1623392112-2919-1623392238.jpg'
    
        },
        {
            name:'My Love',
            author:'Westlife',
            path:'./music/My Love - Westlife.mp3',
            image:'./img/Westlife-Wild-Dreams.jpg'
    
        },
        {
            name:'Tu Phir Se Aana',
            author:'Raftaar',
            path:'./music/Tu Phir Se Aana - Raftaar.mp3',
            image:'./img/Tu Aana Phir Se Rap Song Lyrics By Raftaar.jpg'
    
        },
        {
            name:'Naachne Ka Shaunq',
            author:'Mr.Nair',
            path:'./music/Naachne Ka Shaunq - Mr.Nair 128 Kbps.mp3',
            image:'./img/Mr.Nair.webp'
    
        },
        {
            name:'Click Pow Get Down',
            author:'Raftaar -VlcMusic',
            path:'./music/Click Pow Get Down-Raftaar -VlcMusic.CoM.mp3',
            image:'./img/Raftaar -VlcMusic.jpg'
    
        },
    
    ],
    setconfig:function(key,value){
        this.config[key]=value;
        localStorage.setItem(PLAYERE_STORAGE,JSON.stringify(this.config))

    },
    render:function(){
        //khởi tạo 1 gia trị để trả về
        // const htmls=this.songs.map(function((song)(index)){});
        const html=this.songs.map((song , indexx)=>{
            return `
            <div class="playlist ${indexx === this.curentIndex ? 'active': ''}" data-index="${indexx}">
                <div class="thumb" 
                    style="background-image: url('${song.image}')"></div>
                <div class="play_list_body">
                   <h3 class="title_name">${song.name}</h3>
                   <p class="author">${song.author}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });
        playlist_contains.innerHTML=html.join('');

    },
    // cú pháp defineProperty()gồm 3 đối số

    // Object.defineProperty(object1, 'property1', {
    //     value: 42,
    //     writable: false
    //   });
      
    defineProperti:function(){
        Object.defineProperty(this,'currentsong',{
            get:function(){
                return this.songs[this.curentIndex];
            }
        })
    },
    handleEvent:function(){
        const _this=this;
        // phóng to/thu nhỏ đĩa CD
        //láy giá trị của CD
        // const cdHigth=cd.offsetHeight;
        const cdWidth=cd.offsetWidth;
        //xử lý CD quay/dừng
        const cdrotate=cdthumd.animate({
            transform:['rotate(0)','rotate(360deg)']
        },{
            duration:10000,//quay 10giaay
            iterations:Infinity//lặp vô hạn
        })
        cdrotate.pause();
        // console.log(cdrotate);
        
        //sự kiện kéo thả Cd
        document.onscroll=function(){
            const scrollTop=window.scrollY || document.documentElement.scrollTop;
            // const newHeight=cdHigth -scrollTop;
            const newWidth=cdWidth -scrollTop;
            // cd.style.height=newHeight>0? newHeight+'px':0
            cd.style.width=newWidth>0? newWidth+'px':0
            //độ mờ
            // cd.style.opacity=newHeight/cdHigth;
            cd.style.opacity=newWidth/cdWidth;
        }
        // khi click play/pause
            playBtn.onclick=function(){
                if(_this.isPlaying){
                    audio.pause();
                }
                else{
                    audio.play();  
                }
            }
            //khi bài hát được play
            audio.onplay=function(){
                _this.isPlaying=true;
                player.classList.add('playing');
                cdrotate.play();

            }
            //khi bài hát bị pause
            audio.onpause=function(){
                _this.isPlaying=false;
                player.classList.remove('playing');
                cdrotate.pause();

            }
            //thời lượng của bài hát thay đổi
            audio.ontimeupdate=function(){
                if(audio.duration){
                    // xử lý thời gian chạy theo bài hát
                    progresstime.textContent=_this.timeFormat(this.currentTime.toFixed(2))
                    progressduration.textContent=_this.timeFormat(this.duration.toFixed(2))
                    // thanh control di chuyển
                    const progressPercent = (audio.currentTime / audio.duration) * 100;
                    progress.value=progressPercent;
                    
                }
                _this.render()
            }
            // xử lý thanh kéo dâm nhạc khi click trên thanh
            progress.onchange = function (e) {
                const seekTime = (audio.duration / 100) * e.target.value;
                audio.currentTime = seekTime;
            }
        
            // xử lý khi tua bài hát
            // xử lý thanh tiên trình tua bài hát
            progressBar.onmousedown=function(e){
                audio.currentTime=e.offsetX / this.offsetWidth * audio.duration;
                    // cái này dùng để giữ thanh tiến trình
                _this.isHoldProgressBar=true
            }
            progressBar.onmousemove=function(e){
                if(_this.isHoldProgressBar){
                    audio.currentTime=e.offsetX / this.offsetWidth*audio.duration;
                }
            }

            // khi next bài hát
            nextBtn.onclick=function(){
                if(_this.isRandom){
                    _this.playRandomsong();
                }
                else{
                    _this.nextSong()
                };
                
                audio.play()
                _this.render()
                _this.ScrollActiepsong();
            }
            // khi prew song
            preBtn.onclick=function(){
                if(_this.isRandom){
                    _this.playRandomsong();
                }
                
                else{
                    _this.prewSong();
                }
                audio.play()
                _this.render()
                // keo lên view
                _this.ScrollActiepsong();
            }
            //random bài hat lắng nghe sự kiện/bat/tat
            randomBtn.onclick=function(){
                //sử dụng đối số của nó
                _this.isRandom=!_this.isRandom;
                _this.setconfig('isRandom',_this.isRandom);
                //tìm hiểu toggle
                randomBtn.classList.toggle('active',_this.isRandom);
                // if(_this.isRandom){
                //     _this.isRandom=false;
                //     randomBtn.classList.add('active');
                // }
                // else{
                //     _this.isRandom=true;
                //     randomBtn.classList.remove('active');
                // }

            }
            // xử lý next bài hat khi kết thúc
            audio.onended=function(){
                if(_this.isRepeat){
                    audio.play();
                }
                else{
                if(_this.isRandom){
                    _this.playRandomsong();
                }
                else{
                    _this.prewSong();
                }
                audio.play();
                }
            }
            //xử lý nút repeat lại 1 bài hát
            Btnrepeat.onclick=function(){
                _this.isRepeat=!_this.isRepeat;
                _this.setconfig('isRepeat',_this.isRepeat)
                Btnrepeat.classList.toggle('active',_this.isRepeat);

            }
            // xử lý volume
            volumeBtn.onclick=function(){
                _this.isMute=!_this.isMute;
                volumeBtn.classList.toggle('active',_this.isMute);
                if(_this.isMute){
                    audio.volume=0
                }
                else{
                    audio.volume=_this.currenVolume
                }
            }
            // lắng nghe hành vi click vào playlist
            playlist_contains.onclick=function(e){
                const songActive=e.target.closest('.playlist:not(active)');
                if(songActive|| e.target.closest('.option')){
                    if(songActive){
                    // do currentIndex là số nên chuyển chuỗi sang số
                    _this.curentIndex=Number(songActive.dataset.index);
                    _this.loadCurrentsong()
                    _this.render();
                    audio.play();
                    }
                    //xử lý khi kích vào option
                    if(e.target.closest('.option')){

                    }
                }
            }
            // xử lý thanh bar volume
            //khi kich trên thanh tiến trình
            volumeBar.onmousedown=function(e){
                if(e.offsetX >= 0 && e.offsetX <= this.offsetWidth){
                    _this.currenVolume=(e.offsetX / this.offsetWidth);
                    audio.volume=_this.currenVolume;
                    volume.style.width=audio.volume*100+'%';
                    if(audio.volume === 0)
                         _this.isMute=true;
                    
                    else _this.isMute=false
                    _this.isHoldVolume=true;
                }
           
            }
            // di chuyển con trỏ chuột trên thanh âm lượng
            volumeBar.onmousemove=function(e){
                if(_this.isHoldVolume){
                    if(e.offsetX >= 0 && e.offsetX <= this.offsetWidth){
                        _this.currenVolume=(e.offsetX / this.offsetWidth)
                        audio.volume=_this.currenVolume
                        volume.style.width=audio.volume * 100 +'%'
                        if(audio.volume === 0)
                         _this.isMute=true
                        else _this.isMute=false
                        
                    }
                }

            }
            // thây đổi volume
            audio.onvolumechange=function(){
                if(_this.isMute){
                    volumeBtn.classList.add('active');
                    volume.style.width=0
                }
                else{
                    volumeBtn.classList.remove('active');
                    volume.style.width=this.volume*100 +'%'
                }
            }
            window.onmouseup=function(){
                _this.isHoldProgressBar=false;
                _this.isHoldVolume=false;
            }
                // nhâp keyboard để chạy nhạc
            document.onkeyup=function(e){
                // console.log(e)
                if(e.which===13){
                    playBtn.click()
                }
                if(e.which===32){
                    playBtn.click()
                }

            }
            // xử lý thanh thời gian chạy theo bài hát
            // audio.ontimeupdate=function(){
            //     progresstime.textContent=_this.timeFormat(this.currentTime.toFixed(2));
            //     progressduration.textContent=_this.timeFormat(this.duration.toFixed(2));

            // }
            

    
    },
    ScrollActiepsong:function(){
        setTimeout(()=>{
            $('.playlist.active').scrollIntoView({
                behavior:'smooth',
                block:'nearest',
                inline:'start'

        
            });

    },300)
},
    timeFormat(seconds){
        const date = new Date(null)
        date.setSeconds(seconds)
        return date.toISOString().slice(14, 19)
    },

    // hàm xử lý bài hát hiện tại
    loadCurrentsong:function(){

        //láy ra giá trị
        heading.textContent=this.currentsong.name
        cdthumd.style.backgroundImage=`url('${this.currentsong.image}')`
        audio.src=this.currentsong.path
 
    },
    loadconfig:function(){
        this.isRandom=this.config.isRandom;
        this.isRepeat=this.config.isRepeat;
    },
    //next bài hát
    nextSong: function(){
        this.curentIndex++;
        if(this.curentIndex >= this.songs.length){
            this.curentIndex=0;
        }
        this.loadCurrentsong();

    },
    prewSong: function(){
        this.curentIndex--;
        if(this.curentIndex < 0){
            this.curentIndex=this.songs.length-1
        }
        this.loadCurrentsong();
    },
    playRandomsong:function(){
        let newIndex;
        do{
            newIndex=Math.floor(Math.random()*this.songs.length);
        }
        while(newIndex===this.curentIndex);
        this.curentIndex=newIndex;
        this.loadCurrentsong();

    },
    start:function(){
        // load lại cấu hình
        this.loadconfig();
        // định nghĩa các thuộc tính
        this.defineProperti();
        //lắng nghe và xử lý các sự kiện
        this.handleEvent();

        this.loadCurrentsong();
        //render ra tên bài hát
        this.render();
        // hiển thị trạng thái random và repeat
        randomBtn.classList.toggle('active',this.isRandom);
        Btnrepeat.classList.toggle('active',this.isRepeat);

    }

}
app.start();
    


