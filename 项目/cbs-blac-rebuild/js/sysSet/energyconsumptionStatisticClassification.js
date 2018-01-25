// 工程信息
var proMessage = JSON.parse(sessionStorage.getItem('bayax_proMsg'));
$(function() {
    $('.logo').attr('src', proMessage.logo_path);
    $('.projectName').text(proMessage.name);

});


var deleteGroupsData = {}; //保存 删除的已编辑的组

var showTreeData = []; //展示 树 数据
var editTreeData = []; //编辑 树 数据
var allTreeData = []; // 所有群组 数据

// 展示树  配置
var showTreeSetting = {
    view: {
        showLine: false,
        showIcon: false
    },
    callback: {
        onClick: showTreeOnClick,

    }
};
// 编辑树  配置
var editTreeSetting = {
    view: {
        showLine: false,
        showIcon: false
    },
    edit: {
        enable: true,
        showRenameBtn: false,
        isCopy: false,
        isMove: false
    },
    data: {},
    callback: {
        onClick: editTreeOnClick,
        // beforeDrag: beforeDrag,
        beforeDrop: editTreeBeforeDrop,
        beforeRemove: editTreeBeforeRemove
    }
};
// 所有树  配置
var allTreesetting = {
    view: {
        showLine: false,
        showIcon: false
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false,
        drag: {
            isCopy: true,
            isMove: false
        }
    },

    data: {},
    callback: {
        // beforeDrag: beforeDrag,
        beforeDrop: allTreebeforeDrop
    }
};
// projectInfo();
energyConsumptionDisplayLoadData();


// 初始化
Initialize(true);




/**
 * [能耗统计  获得数据--左侧菜单栏]
 * @return {[type]} [description]
 */
function energyConsumptionDisplayLoadData() {
    $.ajax({
        url: apiurl + 'energyconfig',
        type: 'GET',
        beforeSend: function() {
            // $(".loading").show();
        },
        complete: function() {
            // $(".loading").hide();
        },
        success: function(data) {
            // $(".loading").hide();
            console.log('查看:' + JSON.stringify(data.data, null, 2))
            if (data.success) {

                if (data.data.items !== null) {

                    var treeTwo = data.data.items.map(function(item) {
                        // item.types = 'treeall';
                        item.open = true;
                        delete item.level;
                        return item;
                    });

                    $.fn.zTree.init($("#alltree"), allTreesetting, treeTwo);
                } else {
                    layer.msg('未配置能耗统计');

                }

            } else {
                layer.msg(data.error_message);
            }
        },
        error: function(data) {
            publicAjaxError(data);
        }
    })
}
/**
 * [初始化数据]
 * @param {Boolean} isInitialize       [请求树数据]
 */
function Initialize(isInitialize) {
    groups = '';
    var dataurl = apiurl + 'project';
    var gettreeurl = apiurl + 'EnergyConfigClassification/0';
    $.ajax({
        url: dataurl,
        type: 'get',
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
        },
        success: function(results) {
            if (results.success) {
                $('#logo').attr('src', results.data.logo_path);
                //请求树      
                $.ajax({
                    url: gettreeurl,
                    type: 'GET',
                    success: function(result) {
                        console.log('结果：123')
                        $(".loading").hide();

                        if (result.success) {
                            console.log('成功')
                            $(".loading").hide();
                            if (isInitialize) {
                                // 展示树


                                showTreeData = showAllNode(result.data.items);
                                $.fn.zTree.init($("#showtree"), showTreeSetting, showTreeData);
                                $.fn.zTree.init($("#edittree"), editTreeSetting, showTreeData);
                            }
                            // classificationTree('trees', results, result);
                        } else {
                            layer.msg(data.error_message);
                        }

                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                });
            } else {
                layer.msg(results.error_message);
            }

        },
        error: function(data) {
            publicAjaxError(data);
        }
    });
}

/**
 *  编辑树  获取所有节点数据 
 * 用于去除重复群组
 */
function getAllNodesData() {
    var zTree = $.fn.zTree.getZTreeObj("edittree");
    // var nodes = zTree.getNodes();
    var nodes = zTree.transformToArray(zTree.getNodes());
    // console.log(JSON.stringify(nodes, null, 2))
    return nodes;
}


/**
 * 展示树 单击方法(打开/关闭 群组)
 * 
 * @param {any} e (标准的 js event 对象)
 * @param {any} treeId (对应 zTree 的 treeId)
 * @param {any} treeNode (被点击的节点 JSON 数据对象)
 */
function showTreeOnClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("showtree");
    zTree.expandNode(treeNode);
}
/**
 * 编辑树 单击方法(打开/关闭 群组)
 * 
 * @param {any} e (标准的 js event 对象)
 * @param {any} treeId (对应 zTree 的 treeId)
 * @param {any} treeNode (被点击的节点 JSON 数据对象)
 */
function editTreeOnClick(e, treeId, treeNode) {
    console.log('123')
    var editzTree = $.fn.zTree.getZTreeObj("edittree");
    editzTree.expandNode(treeNode);
}

/**
 * 编辑树  拖拽完成事件处理
 * 
 * @param {any} treeId (目标节点 targetNode 所在 zTree 的 treeId)
 * @param {any} treeNodes (被拖拽的节点 JSON 数据集合)
 * @param {any} targetNode (treeNodes 被拖拽放开的目标节点 JSON 数据对象)
 * @returns (如果返回 false，zTree 将恢复被拖拽的节点，也无法触发 onDrop 事件回调函数)
 */
function editTreeBeforeDrop(treeId, treeNodes, targetNode) {

    console.log(JSON.stringify(treeNodes, null, 2))
    var zTree = $.fn.zTree.getZTreeObj("edittree");
    var dragnode = zTree.transformToArray(treeNodes);

    var nodes = treeNodes[0];
    if (treeId === 'alltree') {
        layer.msg('本组不允许编辑')
        return false;
    }


    if (targetNode !== null && targetNode.level === 0) {
        if (dragnode.length == 1) {} else {

            var type0 = false,
                type1 = false,
                type2 = false;

            for (var key in dragnode) {
                var levs = dragnode[key].level;
                if (levs === 0) {
                    type0 = true;
                }
                if (levs === 1) {
                    type1 = true;
                }
                if (levs === 2) {
                    type2 = true;
                }
            }
            if (type0 && type1 && type2) {
                layer.msg('最多三级');
                return false;
            }
        }

    }

    if (targetNode !== null && targetNode.level === 1) {
        if (dragnode.length == 1) {} else {
            for (var key in dragnode) {
                if (dragnode[key].level === 1) {
                    layer.msg('最多三级');
                    return false;
                }
            }
        }

    }

    if (targetNode != null && targetNode.level === 2) {
        layer.msg('最多三级');
        return false;
    }


    // var arr = getAllNodesData();
    // for (var key in arr) {
    //     if (arr[key].id === nodes.id) {
    //         layer.msg('该群组已存在');
    //         console.log('查看数据' + key)
    //         return false;

    //     }
    // }


    // console.log(JSON.stringify(targetNode, null, 2))
    if (targetNode === null) {
        console.log('一级')
        nodes.higher_level = 0;
    } else {
        console.log('二级' + targetNode.id)
        nodes.higher_level = targetNode.id;
    }

}

/**
 * 编辑树 删除一个群组
 * 
 * @param {any} treeId (对应 zTree 的 treeId)
 * @param {any} treeNode (将要删除的节点 JSON 数据对象)
 * @returns (如果返回 false，zTree 将不删除节点)
 */
function editTreeBeforeRemove(treeId, treeNode, aa) {

    var zTree = $.fn.zTree.getZTreeObj("edittree");
    var nodes = zTree.transformToArray(treeNode);

    nodes.forEach(function(ele) {

        var data = {
            id: ele.id,
            level: 0,
            higher_level: 0
        };

        deleteGroupsData[ele.id] = data;

    })
    console.log(JSON.stringify(nodes, null, 2))
    console.log(JSON.stringify(deleteGroupsData, null, 2))

    // return false;
}

/**
 * 全部数据 树  拖拽完成事件处理
 * 
 * @param {any} treeId (目标节点 targetNode 所在 zTree 的 treeId)
 * @param {any} treeNodes (被拖拽的节点 JSON 数据集合)
 * @param {any} targetNode (treeNodes 被拖拽放开的目标节点 JSON 数据对象)
 * @returns (如果返回 false，zTree 将恢复被拖拽的节点，也无法触发 onDrop 事件回调函数)
 * @returns 
 */
function allTreebeforeDrop(treeId, treeNodes, targetNode) {
    // console.log(JSON.stringify(targetNode, null, 2))

    var nodes = treeNodes[0];
    if (treeId === 'alltree') {
        layer.msg('本组不允许编辑')
        return false;
    }
    if (targetNode != null && targetNode.level === 2) {
        layer.msg('最多三级');
        return false;
    }



    var arr = getAllNodesData();
    for (var key in arr) {
        if (arr[key].id === nodes.id) {
            layer.msg('该群组已存在');
            return false;
        }
    }

    for (var key in deleteGroupsData) {
        if (nodes.id == key) {
            delete deleteGroupsData[key];
            // return false;
        }
    }

    console.log('查看：' + JSON.stringify(deleteGroupsData, null, 2))

    if (targetNode === null) {
        console.log('一级')
        nodes.higher_level = 0;
    } else {
        console.log('二级级' + targetNode.id)
        nodes.higher_level = targetNode.id;
    }

    // console.log(JSON.stringify(treeNodes, null, 2));
}


// 模块 打开关闭
// function clickShowHide(str) {

// }

// 编辑树  数据处理方法
function showAllNode(item) {
    var arr = [];
    item.forEach(function(ele) {
        var dic = {};
        dic.id = ele.id;
        dic.name = ele.name;
        dic.higher_level = ele.higher_level;
        dic.open = true;
        dic.children = [];
        if (ele.next_level.length > 0) {
            ele.next_level.forEach(function(eletwo) {
                var dictwo = {};
                dictwo.id = eletwo.id;
                dictwo.name = eletwo.name;
                dictwo.higher_level = eletwo.higher_level;
                dictwo.open = true;
                dictwo.children = [];
                if (eletwo.next_level.length > 0) {
                    eletwo.next_level.forEach(function(elethree) {
                        var dicthree = {};
                        dicthree.id = elethree.id;
                        dicthree.name = elethree.name;
                        dicthree.higher_level = elethree.higher_level;
                        dicthree.open = true;
                        dicthree.children = [];
                        dictwo.children.push(dicthree);

                    })
                }
                dic.children.push(dictwo);
            })
        }
        arr.push(dic);
    }, this);

    return arr;
}




// 展示编辑模块切换
function changeContent(str) {
    if (str === 'edit') {

        var zTreeObj = $.fn.zTree.getZTreeObj("edittree");
        zTreeObj.destroy();
        // 编辑树
        $.fn.zTree.init($("#edittree"), editTreeSetting, showTreeData);
    }
    $('.tree-show , .tree-edit').toggle();
    deleteGroupsData = {};
}

/**
 * 更新组数据(未完成)
 * 
 */
function updataTreeData() {

    var arr = []; //暂存树数据用于去重
    var arr2 = []; //保存树数据
    var upGroups = []; //上传数据
    var nodes = getAllNodesData();

    // 获取编辑树的数据
    nodes.forEach(function(ele) {

        var dic = {};
        dic[ele.id] = {
            id: ele.id,
            level: ele.level + 1,
            higher_level: ele.higher_level
        }
        arr.push(dic);
        arr2.push({
            id: ele.id,
            level: ele.level + 1,
            higher_level: ele.higher_level
        });
    });

    for (var key in deleteGroupsData) {
        if (arr.hasOwnProperty(key)) {} else {
            upGroups.push(deleteGroupsData[key])
        }
    }

    var datas = upGroups.concat(arr2);




    console.log('查看编辑的数组：' + JSON.stringify(datas, null, 2))

    $.ajax({
        url: apiurl + 'EnergyConfigClassification',
        type: 'PUT',
        dataType: 'json',
        data: { energy_configs: datas },
        beforeSend: function() {
            $(".loading").show();
        },
        success: function(data) {
            $(".loading").hide();
            if (data.success) {
                Initialize(false);

                var showTreeObj = $.fn.zTree.getZTreeObj("showtree");
                var editTreeObj = $.fn.zTree.getZTreeObj("edittree");
                showTreeObj.destroy();
                editTreeObj.destroy();
                $('.tree-show , .tree-edit').toggle();
                Initialize(true);

            } else {
                layer.msg(data.error_message);
            }
        },
        error: function(data) {
            publicAjaxError(data);
        }
    });
}



// 打开关闭 模块
$('.tree-panel-title').on('click', function() {
    var cla = '.' + $(this).data('for');
    console.log($(this).data('type'))
    if ($(this).data('type') === 'down') {
        // $(cla).stop().slideUp(100);
        $(cla).stop().hide()
        $(this).data('type', 'up');
        $(this).find('span.icon-tree').addClass('icon-add').removeClass('icon-remove');

    } else {
        // $(cla).stop().slideDown(100);
        $(cla).stop().show();
        $(this).data('type', 'down');
        $(this).find('span.icon-tree').addClass('icon-remove').removeClass('icon-add');
    }

});