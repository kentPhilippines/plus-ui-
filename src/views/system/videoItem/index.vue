<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="视频编码" prop="itemCode">
              <el-input v-model="queryParams.itemCode" placeholder="请输入视频编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="视频名称" prop="itemName">
              <el-input v-model="queryParams.itemName" placeholder="请输入视频名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="0:禁用 1:启用" prop="enable">
              <el-input v-model="queryParams.enable" placeholder="请输入0:禁用 1:启用" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否热门 0:不是 1:是" prop="hot">
              <el-select v-model="queryParams.hot" placeholder="请选择是否热门 0:不是 1:是" clearable >
                <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="热门排序" prop="hotOrderId">
              <el-input v-model="queryParams.hotOrderId" placeholder="请输入热门排序" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="0否 1是 分类热门" prop="recommend">
              <el-select v-model="queryParams.recommend" placeholder="请选择0否 1是 分类热门" clearable >
                <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="排序编号" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入排序编号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="分类热门排序ID" prop="recommendOrderId">
              <el-input v-model="queryParams.recommendOrderId" placeholder="请输入分类热门排序ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="站点(每个租户分配一个站点标识)" prop="site">
              <el-input v-model="queryParams.site" placeholder="请输入站点(每个租户分配一个站点标识)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="修改人" prop="modifyBy">
              <el-input v-model="queryParams.modifyBy" placeholder="请输入修改人" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最后修改时间" prop="lastModifyTime">
              <el-input v-model="queryParams.lastModifyTime" placeholder="请输入最后修改时间" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="语言(zh,br)" prop="languageCode">
              <el-input v-model="queryParams.languageCode" placeholder="请输入语言(zh,br)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="图标(后台上传)" prop="icon">
              <el-input v-model="queryParams.icon" placeholder="请输入图标(后台上传)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="视频地址" prop="videoUrl">
              <el-input v-model="queryParams.videoUrl" placeholder="请输入视频地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:videoItem:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['system:videoItem:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['system:videoItem:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:videoItem:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="videoItemList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="" align="center" prop="rowId" v-if="true" />
        <el-table-column label="2.大标题3.小标题" align="center" prop="rowType" />
        <el-table-column label="视频编码" align="center" prop="itemCode" />
        <el-table-column label="视频名称" align="center" prop="itemName" />
        <el-table-column label="0:禁用 1:启用" align="center" prop="enable" />
        <el-table-column label="是否热门 0:不是 1:是" align="center" prop="hot">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.hot"/>
          </template>
        </el-table-column>
        <el-table-column label="热门排序" align="center" prop="hotOrderId" />
        <el-table-column label="0否 1是 分类热门" align="center" prop="recommend">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.recommend"/>
          </template>
        </el-table-column>
        <el-table-column label="排序编号" align="center" prop="orderId" />
        <el-table-column label="分类热门排序ID" align="center" prop="recommendOrderId" />
        <el-table-column label="站点(每个租户分配一个站点标识)" align="center" prop="site" />
        <el-table-column label="修改人" align="center" prop="modifyBy" />
        <el-table-column label="最后修改时间" align="center" prop="lastModifyTime" />
        <el-table-column label="语言(zh,br)" align="center" prop="languageCode" />
        <el-table-column label="图标(后台上传)" align="center" prop="icon" />
        <el-table-column label="视频地址" align="center" prop="videoUrl" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:videoItem:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:videoItem:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改video对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="videoItemFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="视频编码" prop="itemCode">
          <el-input v-model="form.itemCode" placeholder="请输入视频编码" />
        </el-form-item>
        <el-form-item label="视频名称" prop="itemName">
          <el-input v-model="form.itemName" placeholder="请输入视频名称" />
        </el-form-item>
        <el-form-item label="0:禁用 1:启用" prop="enable">
          <el-input v-model="form.enable" placeholder="请输入0:禁用 1:启用" />
        </el-form-item>
        <el-form-item label="是否热门 0:不是 1:是" prop="hot">
          <el-select v-model="form.hot" placeholder="请选择是否热门 0:不是 1:是">
            <el-option
                v-for="dict in sys_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="热门排序" prop="hotOrderId">
          <el-input v-model="form.hotOrderId" placeholder="请输入热门排序" />
        </el-form-item>
        <el-form-item label="0否 1是 分类热门" prop="recommend">
          <el-select v-model="form.recommend" placeholder="请选择0否 1是 分类热门">
            <el-option
                v-for="dict in sys_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序编号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入排序编号" />
        </el-form-item>
        <el-form-item label="分类热门排序ID" prop="recommendOrderId">
          <el-input v-model="form.recommendOrderId" placeholder="请输入分类热门排序ID" />
        </el-form-item>
        <el-form-item label="站点(每个租户分配一个站点标识)" prop="site">
          <el-input v-model="form.site" placeholder="请输入站点(每个租户分配一个站点标识)" />
        </el-form-item>
        <el-form-item label="修改人" prop="modifyBy">
          <el-input v-model="form.modifyBy" placeholder="请输入修改人" />
        </el-form-item>
        <el-form-item label="最后修改时间" prop="lastModifyTime">
          <el-input v-model="form.lastModifyTime" placeholder="请输入最后修改时间" />
        </el-form-item>
        <el-form-item label="语言(zh,br)" prop="languageCode">
          <el-input v-model="form.languageCode" placeholder="请输入语言(zh,br)" />
        </el-form-item>
        <el-form-item label="图标(后台上传)" prop="icon">
            <el-input v-model="form.icon" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="视频地址" prop="videoUrl">
          <el-input v-model="form.videoUrl" placeholder="请输入视频地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="VideoItem" lang="ts">
import { listVideoItem, getVideoItem, delVideoItem, addVideoItem, updateVideoItem } from '@/api/system/videoItem';
import { VideoItemVO, VideoItemQuery, VideoItemForm } from '@/api/system/videoItem/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_yes_no } = toRefs<any>(proxy?.useDict('sys_yes_no'));

const videoItemList = ref<VideoItemVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const videoItemFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: VideoItemForm = {
  rowId: undefined,
  rowType: undefined,
  itemCode: undefined,
  itemName: undefined,
  enable: undefined,
  hot: undefined,
  hotOrderId: undefined,
  recommend: undefined,
  orderId: undefined,
  recommendOrderId: undefined,
  site: undefined,
  modifyBy: undefined,
  lastModifyTime: undefined,
  languageCode: undefined,
  icon: undefined,
  videoUrl: undefined
}
const data = reactive<PageData<VideoItemForm, VideoItemQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    rowType: undefined,
    itemCode: undefined,
    itemName: undefined,
    enable: undefined,
    hot: undefined,
    hotOrderId: undefined,
    recommend: undefined,
    orderId: undefined,
    recommendOrderId: undefined,
    site: undefined,
    modifyBy: undefined,
    lastModifyTime: undefined,
    languageCode: undefined,
    icon: undefined,
    videoUrl: undefined,
    params: {
    }
  },
  rules: {
    rowId: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询video列表 */
const getList = async () => {
  loading.value = true;
  const res = await listVideoItem(queryParams.value);
  videoItemList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  videoItemFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: VideoItemVO[]) => {
  ids.value = selection.map(item => item.rowId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加video";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: VideoItemVO) => {
  reset();
  const _rowId = row?.rowId || ids.value[0]
  const res = await getVideoItem(_rowId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改video";
}

/** 提交按钮 */
const submitForm = () => {
  videoItemFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.rowId) {
        await updateVideoItem(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addVideoItem(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: VideoItemVO) => {
  const _rowIds = row?.rowId || ids.value;
  await proxy?.$modal.confirm('是否确认删除video编号为"' + _rowIds + '"的数据项？').finally(() => loading.value = false);
  await delVideoItem(_rowIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('system/videoItem/export', {
    ...queryParams.value
  }, `videoItem_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
