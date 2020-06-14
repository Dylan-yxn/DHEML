(function(){
    var main = {
        init:function(){
            this.draggable()
                .documentClick()
                .clickLine()
                .clearFlow()
        },
        /**
         * 实现拖拽
         *
         */
        draggable:function(){
            var that = this;
            $("#flow-btns").children().draggable({
                helper: "clone",
                scope: "ss",
            });
            container.droppable({
                scope: "ss",
                drop: function (event, ui) {
                    var left = parseInt(ui.offset.left - $(this).offset().left);
                    var top = parseInt(ui.offset.top - $(this).offset().top);
                    var type = ui.helper.context.dataset.type;
                    if((base_index === 1 && type === "base") || (judge_index === 1 && type === "judge") || (result_index === 1 && type === "result")) {
                          alert('当前选择框只能拖拽一次');
                          return null;
                    }
                    _index++;
                    var id = that.judgeId(type,_index);
                    var dom = $('<div class="node-common" id="' + id + '" data-type="'+type+'"><img class="img-common" src="" alt=""><span class="node-text"></span><img class="success-icon" id="c'+id+'"></div>')
                    $(this).append(dom);
                    dom.css("left", left).css("top", top);
                    // 根据不同的类型，在画布中添加对应的节点
                    switch (type) {
                        case "base":
                            base_index++;
                            dom.addClass('node-base');
                            dom.children('.img-common').attr('src','static/public/img/params.png');
                            dom.children('.success-icon').attr('src','static/public/img/success.png');
                            dom.children('span').text('参数选择');
                            jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, endpointStyle);
                          break;
                        case "flow":
                            dom.addClass('node-flow');
                            dom.children('img').attr('src','static/public/img/upload.png');
                            dom.children('.success-icon').attr('src','static/public/img/success.png');
                            dom.children('span').text('读取文件');
                            jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, endpointStyle);
                            jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, endpointStyle);
                            // jsPlumb.addEndpoint(id, { anchors: [0.25,1,0,1] }, endpointStyle);
                            // jsPlumb.addEndpoint(id, { anchors: [0.5,1,0,1] }, endpointStyle);
                            // jsPlumb.addEndpoint(id, { anchors: [0.75,1,0,1] }, endpointStyle);
                            break;
                        case "node":
                            dom.addClass('node-node');
                            dom.children('img').attr('src','static/public/img/pwd.png');
                            dom.children('.success-icon').hide();
                            dom.children('span').text('加密');
                            jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, endpointStyle);
                            jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, endpointStyle);
                            break;
                        case "judge":
                            judge_index++
                            dom.addClass('node-judge');
                            dom.children('img').attr('src','static/public/img/train.png');
                            dom.children('.success-icon').hide();
                            dom.children('span').text('数据训练');
                            jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, endpointStyle);
                            jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, endpointStyle);
                            jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, endpointStyle);
                            jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }, endpointStyle);
                            break;
                        case "result":
                            result_index++
                            dom.addClass('node-result');
                            dom.children('img').attr('src','static/public/img/result.png');
                            dom.children('.success-icon').attr('src','static/public/img/success.png');
                            dom.children('span').text('训练结果');
                            jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, endpointStyle);
                            break;
                    }
                    // jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, endpointStyle);
                    // jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }, endpointStyle);
                    jsPlumb.draggable(id);
                    //jsPlumb.hide(id,true);
                    dom.draggable({ containment: "parent" });
                    that.nodeClick(id);
                    //that.nodeMouseOver(id);
                }
            });
            return this;
        },
      /**
       * 鼠标经过事件
       */
      // nodeMouseOver:function(id){
      //   console.log(id);
      //   $('#'+id).mouseover(function () {
      //     //console.log('你好啊');
      //     jsPlumb.show(id,true);
      //   })
      //   $('#'+id).mouseout(function () {
      //     //console.log('你好啊');
      //     setTimeout(() => {
      //       jsPlumb.hide(id,true);
      //     }, 5000)
      //   })
      // },

      /**
         * 节点点击事件
         *
         */
        nodeClick:function(id){
            var currentDom =  $('#'+id);
            //console.log(currentDom)
            var type = currentDom.selector.substring(1,5);
            var nextDom = currentDom.parent().parent().next().children('form');
            switch (type) {
            case "base":
              nextDom.html('');

              // var numberInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" placeholder='number'/></div>");
              // var numberIterInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" placeholder='numberIter'/></div>");
              // var gammaUpInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" placeholder='gammaUp'/></div>");
              // var gammaDownInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" placeholder='gammaDown'/></div>");
              // var isFirstInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" placeholder='isFirst'/></div>");
              // var submitBtn = $('<button onclick="dataSave()" class="btn btn-primary form-submit">Submit</button>');
              // nextDom.append(numberInput)
              //     .append(numberIterInput)
              //     .append(gammaUpInput)
              //     .append(gammaDownInput)
              //     .append(isFirstInput)
              //     .append(submitBtn);
              break;
            case "flow":
              nextDom.html('');
              // var fileUpload = $("<div class=\"form-group\"><input type=\"file\" id=\"exampleInputFile\"><p class=\"help-block\">Example block-level help text here.</p></div>");
              // var submitBtn = $('<button onclick="filtUpload()" class="btn btn-primary form-submit">Submit</button>');
              // nextDom.append(fileUpload)
              //     .append(submitBtn);
              break;
            case "node":
              nextDom.html('');
              break;
            case "judg":
              nextDom.html('');
              break;
            case "resu":
              nextDom.html('');
              break;
          }
            // 单击选中，可删除，可回显数据
            currentDom.click(function(){
              var id = currentDom.selector.substring(1);
              var type = currentDom.selector.substring(1,5);
              // console.log(type);
              // console.log(id);
              clearTimeout(nodeTimes);
                //执行延时
                nodeTimes = setTimeout(function(){
                    container.children('.node-common').removeClass('node-focus');
                    currentDom.addClass('node-focus');
                  switch (type) {
                    case "base":
                      nextDom.html('');
                      //下面这里可以直接删除 暂时代替ajax
                      // var numberInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='number' placeholder='number'/></div>");
                      // var numberIterInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='numberIter' placeholder='numberIter'/></div>");
                      // var gammaUpInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='gammaUp' placeholder='gammaUp'/></div>");
                      // var gammaDownInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='gammaDown' placeholder='gammaDown'/></div>");
                      // var isFirstInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='isFirst' placeholder='isFirst'/></div>");
                      // var submitBtn = $('<button onclick="dataSave('+ id +')" class="btn btn-primary form-submit">Submit</button>');
                      // $('#form-data').append(numberInput)
                      //     .append(numberIterInput)
                      //     .append(gammaUpInput)
                      //     .append(gammaDownInput)
                      //     .append(isFirstInput)
                      //     .append(submitBtn);
                      // console.log(id)
                      //这里用来点击节点时获取数据 我在这里预留了AJAX
                      $.ajax({
                        url: '/params',
                        type: 'POST',
                        data: {id},
                        success: function (response) {
                          if(response.number == null) {
                            console.log('后台无此数据');
                            var numberInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='number' placeholder='number'/></div>");
                            var numberIterInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='numberIter' placeholder='numberIter'/></div>");
                            var gammaUpInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='gammaUp' placeholder='gammaUp'/></div>");
                            var gammaDownInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='gammaDown' placeholder='gammaDown'/></div>");
                            var isFirstInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='isFirst' placeholder='isFirst'/></div>");
                            var submitBtn = $('<button onclick="dataSave('+ id +')" class="btn btn-primary form-submit">Submit</button>');
                            $('#form-data').append(numberInput)
                                .append(numberIterInput)
                                .append(gammaUpInput)
                                .append(gammaDownInput)
                                .append(isFirstInput)
                                .append(submitBtn);
                          } else {
                            console.log('后台返回的数据');
                            var numberInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='number' placeholder='number'/></div>");
                            var numberIterInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='numberIter' placeholder='numberIter'/></div>");
                            var gammaUpInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='gammaUp' placeholder='gammaUp'/></div>");
                            var gammaDownInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='gammaDown' placeholder='gammaDown'/></div>");
                            var isFirstInput = $("<div class=\"form-group\"><input type='text' class=\"form-control\" id='isFirst' placeholder='isFirst'/></div>");
                            var submitBtn = $('<button onclick="dataSave('+ id +')" class="btn btn-primary form-submit">Submit</button>');
                            $('#form-data').append(numberInput)
                                .append(numberIterInput)
                                .append(gammaUpInput)
                                .append(gammaDownInput)
                                .append(isFirstInput)
                                .append(submitBtn);
                            $('#number').val(response.number);
                            $('#numberIter').val(response.numberIter);
                            $('#gammaUp').val(response.gammaUp);
                            $('#gammaDown').val(response.gammaDown);
                            $('#isFirst').val(response.isFirst);
                          }
                        },
                        error: function(){
                          console.log('back  error')
                        }
                      })
                      break;
                    case "flow":
                      nextDom.html('');

                      // var uploadInput = $('<div class="form-group"><input id="fileUploadInput" type="file" name="filesUpload"><p class="help-block">Example block-level help text here.</p></div>');
                      // var uploadIdInput = $('<div class="form-group"><input type="hidden" id="uploadId" value="'+id+'"  ></div>');
                      // var uploadSubBtn = $('<input type="submit" value="上传" class="btn btn-primary form-submit">');
                      // $('#form-upload').append(uploadInput)
                      //                 .append(uploadIdInput)
                      //                 .append(uploadSubBtn);
                      $.ajax({
                        url: '/upload',
                        type: 'POST',
                        data: {id},
                        success: function (response) {
                          if(response.fileUploadInput === null){
                            console.log('后台无此数据');
                            var uploadInput = $('<div class="form-group"><input id="fileUploadInput" type="file" name="filesUpload"><p class="help-block">Example block-level help text here.</p></div>');
                            var uploadIdInput = $('<div class="form-group"><input type="hidden" id="uploadId" value="'+id+'"  ></div>');
                            var uploadSubBtn = $('<input type="submit" onclick="fileUp('+id+')" value="上传" class="btn btn-primary form-submit">');
                            $('#form-upload').append(uploadInput)
                                .append(uploadIdInput)
                                .append(uploadSubBtn);
                            // $('#c'+id).html('');
                            // $('#c'+id).attr('src','static/public/img/success.png');
                          } else {
                            console.log('后台返回的数据');
                            console.log(response.fileUploadInput[0].substring(response.fileUploadInput[0].length-10))
                            var uploadInput = $('<div class="form-group"><input id="fileUploadInput" type="file" name="filesUpload"><p class="help-block">Example block-level help text here.</p></div>');
                            var uploadIdInput = $('<div class="form-group"><input type="hidden" id="uploadId" value="'+id+'"  ></div>');
                            var uploadSubBtn = $('<input type="submit" value="重新上传" class="btn btn-primary form-submit">');
                            var uploadReSpan = $('<div class="form-group"><span id="reSpan"></span></div>');
                            $('#form-upload').append(uploadInput)
                                .append(uploadIdInput)
                                .append(uploadSubBtn)
                                .append(uploadReSpan);
                            $('#reSpan').text(''+response.fileUploadInput[0].substring(response.fileUploadInput[0].length-10)+'<br/>');
                            // $('#c'+id).html('');
                            // $('#c'+id).attr('src','static/public/img/success_green.png');
                          }
                        },
                        error: function () {
                          console.log('back  error')
                        }
                      })

                      // var fileUploadInput = $("<div class=\"form-group\"><input type=\"file\" id=\"filesUpload\"><p class=\"help-block\">Example block-level help text here.</p></div>");
                      // //var uploadBtn = $('<input type="button" value="Submit" onclick="fileUpload('+ id +')" class="btn btn-primary form-submit">Submit');
                      // var uploadIdInput = $("<div class=\"form-group\"><input type=\"hidden\" id=\"uploadId\" value="+id+"  ></div>");
                      // var uploadBtn = $('<input type="submit" value="Submit" class="btn btn-primary form-submit" />');
                      // $('#form-upload').append(fileUploadInput)
                      //     .append(uploadIdInput)
                      //     .append(uploadBtn);
                      break;
                    case "node":
                      nextDom.html('');
                      //这里可以修改加密方式
                      /*$.ajax({
		                url: '/keyreturn',
		                type: 'GET',
		                success: function (response) {
		                	  console.log("success")
			                  var nodeTypeBtn = $(`
			                  <div class="btn-group div-type">
			                    <button type="button" class="btn btn-info dropdown-toggle node-type" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			                      加密方式 <span class="caret"></span>
			                    </button>
			                    <ul class="dropdown-menu">
			                      <li><a href="#" onclick="$('#nodeText').val(response.data[0])">私钥</a></li>
			                      <li role="separator" class="divider"></li>
			                      <li><a href="#" onclick="$('#nodeText').val(response.data[1])">公钥</a></li>
			                      <li role="separator" class="divider"></li>
			                      <li><a href="#" onclick="$('#nodeText').val(response.data[2])">再线性回归公钥</a></li>
			                      <li role="separator" class="divider"></li>
			                      <li><a href="#" onclick="$('#nodeText').val(response.data[3])">旋转公钥</a></li>
			                    </ul>
			                  </div>
			                `)
		                  var nodeText = $("<div class=\"form-group\"><textarea cols=\"2\" rows=\"12\" class=\"form-control\" id=\"nodeText\" readonly placeholder='请选择需要回显的加密方式'/></div>");
		                  $('#form-data').append(nodeText).append(nodeTypeBtn);
		                },
                  		error: function() {
	                  		console.log("500")
	                  	}
              })*/
              var nodeTypeBtn1 = $(`
                  <div class="btn-group div-type">
                    <button type="button" class="btn btn-info" id="keyType">查看</button>
                    <button type="button" class="btn btn-info dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="caret"></span>
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
<!--                      <li><a href="#" onclick="reNodeText(1)">私钥</a></li>-->
                      <li><a href="#" onclick="$('#nodeText').val('12312312312');$('#keyType')[0].innerText='私钥'">私钥</a></li>
                      <li role="separator" class="divider"></li>
                      <li><a href="#" onclick="$('#nodeText').val('124124123');$('#keyType')[0].innerText='公钥'">公钥</a></li>
                      <li role="separator" class="divider"></li>
                      <li><a href="#" onclick="$('#nodeText').val('再线性回归公钥');$('#keyType')[0].innerText='再线性回归公钥'">再线性回归公钥</a></li>
                      <li role="separator" class="divider"></li>
                      <li><a href="#" onclick="$('#nodeText').val('旋转公钥');$('#keyType')[0].innerText='旋转公钥'">旋转公钥</a></li>
                    </ul>
                  </div>
                `)
              var nodeText = $("<div class=\"form-group\">" +
                  "<textarea cols=\"2\" rows=\"12\" class=\"form-control\" " +
                  "id=\"nodeText\" readonly placeholder='请选择需要回显的密钥'/></div>");
              $('#form-data').append(nodeText).append(nodeTypeBtn1);

                      break;
                    case "judg":
                      nextDom.html('');
                      break;
                    case "resu":
                      nextDom.html('');
                      // var resultInput = $("<div class=\"form-group\"><input type=\"text\" class=\"form-control\" id=\"resultText\" readonly placeholder='暂无结果'></div>");
                      // $('#form-data').append(resultInput)
                      // 这里预留了训练结果的接收
                      $.ajax({
                        url: '/result',
                        type: 'POST',
                        data: {id},
                        success: function (response) {
                          console.log('success')
                          console.log(response.data)
                          var resultInput = $("<div class=\"form-group\"><textarea cols=\"2\" rows=\"6\" class=\"form-control\" id=\"resultText\" readonly placeholder='暂无结果'/></div>");
                          $('#form-data').append(resultInput);
                          $('#resultText').val(response.data);
                        }
                      })
                      break;
                  }
                  var input = $("<input type='text' class='hide-input'/>");
                  setTimeout(function(){
                    input.focus();
                  },50)
                  currentDom.append(input);
                    currentDom.keydown(function (event) {
                        event=event||window.event
                        //console.log(event.keyCode)
                        if(event.keyCode==8 || event.keyCode==46){  //8--backspace;46--delete

                          //这里等待添加删除数据
                            // $.ajax({
                            //   url: '/delete',
                            //   type: 'DELETE',
                            //   data: id,
                            //   success: function () {
                            //     console.log('成功了');
                            //   }
                            // })
                            currentDom.remove();
                            jsPlumb.removeAllEndpoints(id);
                            nextDom.html('');
                            return false;
                        }
                    });
                },300);
            })
        },
        /**
         * 单击删除连线
         *
         */
        clickLine:function(){
            jsPlumb.bind("click", function (conn, originalEvent) {
                // 取消上次延时未执行的方法
                clearTimeout(lineTimes);
                //执行延时
                lineTimes = setTimeout(function(){
                    jsPlumb.repaintEverything();
                    var target = originalEvent.toElement;
                    var isOuter = target.getAttribute('class') ? true : false;
                    if(isOuter){
                        return false;
                    }
                    target.setAttribute('stroke','#409eff');
                    $(document).keydown(function(event){
                        event=event||window.event
                        if(event.keyCode==8 || event.keyCode==46){  //8--backspace;46--delete
                            jsPlumb.detach(conn);
                            return false;
                        }
                    })
                },300);
            });
            return this;
        },
      /**
       * 单击空白处
       *
       */
      documentClick:function(){
        $(document).click(function(e){
          e = e || window.event;
          var target = e.target || e.srcElement;
          $(document).off('keydown')
          //如果有在编辑的节点，要完成赋值
          var focusNode = $('.node-common.node-focus');
          if(focusNode.length != 0){
            var isHasInput = focusNode.children("input.flow-input").length == 0 ? false : true;
            if(isHasInput){
              focusNode.children('span').html(focusNode.children("input.flow-input").val());
              focusNode.children("input.flow-input").remove();
              jsPlumb.repaintEverything();
            }
          }
          //节点，连接线取消选中状态
          $('.node-common').removeClass('node-focus');
          var paths = $('path');
          if(paths.length != 0){
            for(var i = 0; i<paths.length;i++ ){
              var item = paths[i];
              if(item.getAttribute('class')){
                continue;
              }
              //item.setAttribute('stroke','#a9ffae');
            }
          }

        })

        return this;
      },
        /**
         * 清空画布
         *
         */
        clearFlow:function(){
            $('#delete').click(function(){
                $('#flow-main').html('')
            })
            return this;
        },
        /**
         * 防止节点id重复
         * @params type Srting 节点类型
         * @params num Number 当前顺序号
         * @return id String 不重复的id
         */
        judgeId: function(type,num){
            var id = type + num;
            var doms = $('#'+id)
            if(doms.length != 0){
                _index = num + 1;
                return judgeId(type,_index);
            }
            return type + num;
        },
    }
    main.init();
})();
/**
 * 上传文件
 */
// function fileUpload(id) {
//   //console.log(id);
//   var formData = new FormData();
//   var fileList = $("#filesUpload")[0].files;
//   console.log(fileList);
//   formData.append('upFiles',fileList[0]);
//   console.log(formData);
//   $.ajax({
//     url: '/upload',
//     method: 'POST',
//     data: formData,
//     contentType: false,
//     processData: false,
//     success: function () {
//       console.log('上传成功')
//     },
//     error: function () {
//       console.log('上传失败')
//     }
//   })
// }

/**
 * 保存传递参数选择的数据
 */
function dataSave(id) {
  console.log(id.id);
  $.ajax({
    url: '/params',
    method: 'POST',
    data: {
      id: id.id,
      number: $('#number').val(),
      numberIter: $('#numberIter').val(),
      gammaUp: $('#gammaUp').val(),
      gammaDown: $('#gammaDown').val(),
      isFirst: $('#isFirst').val(),
    },
    success: function () {
      console.log('传递成功');
      $('#c'+id.id).html('');
      $('#c'+id.id).attr('src','static/public/img/success_green.png');
    },
    error: function () {
      $('#c'+id.id).html('');
      $('#c'+id.id).attr('src','static/public/img/success.png');
    }
  })
}

function fileUp(id) {
      $('#c'+id.id).html('');
      $('#c'+id.id).attr('src','static/public/img/success_green.png');
}
$(function () {
 $("#train_run").click(function () {
   $.ajax({
     url: '/run',
     type: 'GET',
     beforeSend: function() {
      $('#loading').html('')
       var loadingIcon = $("<div><img class='loading-icon' src='static/public/img/Loading_icon.gif' alt='Loading'><span>Loading...</span><div>");
       // var loadingText = $("");
      // var loadingImg = $("<img class='loading-img' src='../public/img/Loading.gif' alt='Loading'>");
      $('#loading').append(loadingIcon)
          // .append(loadingText)
          //           .append(loadingImg);
       $('#train_run').attr('disabled',true);
       //这里将线改成虚线
       var paths = $('path');
       if(paths.length != 0){
         console.log(paths[0])
         for(var i = 0; i<paths.length;i++ ){
           var item = paths[i];
           if(item.getAttribute('class')){
             continue;
           }
           item.setAttribute('stroke-dasharray','4 2');
           //这里修改虚线的颜色
           item.setAttribute('stroke','#45ecff');
         }
       }
     },
     success: function (response) {
      $('#loading').html('')
       var successIcon = $("<div><img class='loading-icon' src='static/public/img/success.png' alt='Loading'><span>计算成功...</span><div>");
       $('#loading').append(successIcon);
       $('#train_run').attr('disabled',false);
       $('#c'+response.id).html('');
       $('#c'+response.id).attr('src','static/public/img/success_green.png');
        console.log('计算成功');

       //这里将线改为实线
       var paths = $('path');
       if(paths.length != 0){
         console.log(paths[0])
         for(var i = 0; i<paths.length;i++ ){
           var item = paths[i];
           if(item.getAttribute('class')){
             continue;
           }
           item.removeAttribute('stroke-dasharray');
           item.setAttribute('stroke', '#696969');
         }
       }
     }
   })
 })
})

