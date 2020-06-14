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
                
                    _index++;
                    var id = that.judgeId(type,_index);
                    var dom = $('<div class="node-common" id="' + id + '" data-type="'+type+'"><span class="node-text"></span></div>')
                    $(this).append(dom);
                    dom.css("left", left).css("top", top);

                    // 根据不同的类型，在画布中添加对应的节点
                    switch (type) {
                        case "base":
                            dom.addClass('node-base');
                            dom.children('span').text('参数选择');
                            break;
                        case "flow":
                            dom.addClass('node-flow');
                            dom.children('span').text('读取文件');
                            break;
                        case "node":
                            dom.addClass('node-node');
                            dom.children('span').text('加密');
                            break;
                        case "judge":
                            dom.addClass('node-judge');
                            dom.children('span').text('数据训练');
                            break;
                        case "result":
                            dom.addClass('node-result');
                            dom.children('span').text('训练结果');
                            break;
                    }
                    jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, endpointStyle);
                    jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, endpointStyle);
                    jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, endpointStyle);
                    jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }, endpointStyle);
                    jsPlumb.draggable(id);
                    dom.draggable({ containment: "parent" });
                    that.nodeClick(id);
                }
            });
            return this;
        },
        /**
         * 节点点击事件
         *
         */
        nodeClick:function(id){
            var currentDom =  $('#'+id);
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
              clearTimeout(nodeTimes);
                //执行延时
                nodeTimes = setTimeout(function(){
                    container.children('.node-common').removeClass('node-focus');
                    currentDom.addClass('node-focus');
                  switch (type) {
                    case "base":
                      nextDom.html('');

                      //下面这里可以直接删除 暂时代替ajax
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

                      //这里用来点击节点时获取数据 我在这里预留了AJAX
                     /* $.ajax({
                        url: '',
                        type: 'POST',
                        data: id,
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
                        }
                      })*/
                      break;
                    case "flow":
                      nextDom.html('');

                      var uploadInput = $('<div class="form-group"><input id="fileUploadInput" type="file" name="filesUpload"><p class="help-block">Example block-level help text here.</p></div>');
                      var uploadIdInput = $('<div class="form-group"><input type="hidden" id="uploadId" value="'+id+'"  ></div>');
                      var uploadSubBtn = $('<input type="submit" value="上传" class="btn btn-primary form-submit">');
                      $('#form-upload').append(uploadInput)
                                      .append(uploadIdInput)
                                      .append(uploadSubBtn);
                      /*$.ajax({
                        url: '',
                        type: 'POST',
                        data: id,
                        success: function (response) {
                          if(response.name == null){
                            console.log('后台无此数据');
                            var uploadInput = $('<div class="form-group"><input id="fileUploadInput" type="file" name="filesUpload"><p class="help-block">Example block-level help text here.</p></div>');
                            var uploadIdInput = $('<div class="form-group"><input type="hidden" id="uploadId" value="'+id+'"  ></div>');
                            var uploadSubBtn = $('<input type="submit" value="上传" class="btn btn-primary form-submit">');
                            $('#form-upload').append(uploadInput)
                                .append(uploadIdInput)
                                .append(uploadSubBtn);
                          } else {
                            console.log('后台返回的数据');
                            var uploadInput = $('<div class="form-group"><input id="fileUploadInput" type="file" name="filesUpload"><p class="help-block">Example block-level help text here.</p></div>');
                            var uploadIdInput = $('<div class="form-group"><input type="hidden" id="uploadId" value="'+id+'"  ></div>');
                            var uploadSubBtn = $('<input type="submit" value="重新上传" class="btn btn-primary form-submit">');
                            $('#form-upload').append(uploadInput)
                                .append(uploadIdInput)
                                .append(uploadSubBtn);
                            $('#fileUploadInput').val(response.name);
                          }
                        },
                        error: function () {

                        }
                      })*/

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
                      break;
                    case "judg":
                      nextDom.html('');
                      break;
                    case "resu":
                      nextDom.html('');
                      var resultInput = $("<div class=\"form-group\"><textarea cols=\"2\" rows=\"6\" class=\"form-control\" id=\"resultText\" readonly placeholder='暂无结果'/></div>");
                      $('#form-data').append(resultInput);
                      // 这里预留了训练结果的接收
                      // $.ajax({
                      //   url: '',
                      //   type: 'POST',
                      //   data: id,
                      //   success: function (response) {
                      //     var resultInput = $("<div class=\"form-group\"><input type=\"text\" class=\"form-control\" id=\"resultText\" readonly></div>");
                      //     nextDom.append(resultInput);
                      //     $('#resultText').val(response.data);
                      //   }
                      // })
                      break;
                  }
                  var input = $("<input type='text' class='hide-input'/>");
                  setTimeout(function(){
                    input.focus();
                  },50)
                  currentDom.append(input);
                    currentDom.keydown(function (event) {
                        event=event||window.event
                        if(event.keyCode==8 || event.keyCode==46){  //8--backspace;46--delete

                          //这里等待添加删除数据库
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
    },
    error: function () {

    }
  })
}

$(function () {
 $("#train_run").click(function () {
   console.log('run');
   $.ajax({
     url: '/run',
     type: 'GET',
     beforeSend: function() {
      $('#loading').html='';
       var loadingText = $("<span>Loading...</span>")
      $('#loading').append(loadingText);
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
           item.setAttribute('stroke','#45ecff');
         }
       }
     },
     success: function () {
      $('#loading').html='';
       var successText = $("<span>计算成功...</span>")
      $('#loading').append(successText);
       $('#train_run').attr('disabled',false);
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
           item.setAttribute('stroke', '#a9ffae');
         }
       }
     }
   })
 })
})

