var array = [
    {name: '刘一' , img: './t1.jpg' , content: '的就是打开技术大厦的华盛顿的' ,sex: 'a m'},
    {name: '刘子欣',img: './t2.jpg' , content: '的就是加收的活动啥的的得到的' ,sex: 'a f'},
    {name: '天大' , img: './t3.jpg' , content: '的就是黑暗时代还是副书记顿的' ,sex: 'a m'},
    {name: '天馨' , img: './t4.jpg' , content: '安徽速度速的极化方式打赏顿的' ,sex: 'a f'}
]

var oUl = document.getElementsByClassName('list-box')[0]
var inputValue = document.getElementsByClassName('search-in')[0]
var Sex = document.getElementsByClassName('search')[0].getElementsByTagName('p')[0]
var text = ' '
var sex = ' '

function renderElement(arr){
    var str  = ''
    arr.forEach(function(ele,index){
        //使用字符串拼接的方法，然后使用innerHTMl强制将字符串转化为标签的形式，在这里使用\来连接字符串
         str  += '<li>\
                        <img src='+ ele.img +' alt="">\
                        <p class="username">'+ ele.name +'</p>\
                        <p class="content">'+ ele.content +'</p>\
                  </li>'
    })
    oUl.innerHTML = str
}
renderElement(array)

//获取到输入框中的值
inputValue.oninput = function(){
    text = this.value
    //将筛选出来的数组进行重新的渲染 
    var lastArr =  filterSex(sex,array) 
    renderElement(filterText(text,lastArr))
}

//根据name对数组中的元素进行筛选
function filterText(text,arr){
    return arr.filter(function(ele,index){
        //ele.name.indexOf(text) != -1，indexOf方法中，如果其里面传入的参数，在数组中不含有对应的值就返回-1，有就出现对应的字符串
        if(ele.name.indexOf(text) != -1){
            return true
        }else{
            return false
        }
    })
}

//根据性别对数组进行筛选
function filterSex(sex,arr){
    //直接在标签中设置sex属性,然后用获取到的数据来进行判断
    if(sex == 'a'){
        return arr
    }else{
        return arr.filter(function(ele,index){
            //注意数组的filter方法，其返回的结果是根据true或者是false来进行新的数组的更换
            return ele.sex == sex
        })
    }
}

//背景颜色的改变
Sex.addEventListener('click',function(e){
    //e.target.nodeName将获取到的节点的标签名转化为大写的名称
    if(e.target.nodeName == 'SPAN'){
        var spanArray = document.getElementsByTagName('span')
        for(var i = 0 ; i < spanArray.length; i++){
            spanArray[i].className = ' ';
        }
        e.target.className = 'active'
        //根据节点获取到标签中有的属性
        sex = e.target.getAttribute('sex')
        //将数组进行多次筛选
        var lastArr = filterText(text,array)
        renderElement(filterSex(sex,lastArr))
    }
})
