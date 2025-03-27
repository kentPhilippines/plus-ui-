export interface VideoItemVO {
  /**
   * 
   */
  rowId: string | number;

  /**
   * 2.大标题3.小标题
   */
  rowType: number;

  /**
   * 视频编码
   */
  itemCode: string;

  /**
   * 视频名称
   */
  itemName: string;

  /**
   * 0:禁用 1:启用
   */
  enable: number;

  /**
   * 是否热门 0:不是 1:是
   */
  hot: number;

  /**
   * 热门排序
   */
  hotOrderId: string | number;

  /**
   * 0否 1是 分类热门
   */
  recommend: number;

  /**
   * 排序编号
   */
  orderId: string | number;

  /**
   * 分类热门排序ID
   */
  recommendOrderId: string | number;

  /**
   * 站点(每个租户分配一个站点标识)
   */
  site: string;

  /**
   * 修改人
   */
  modifyBy: string;

  /**
   * 最后修改时间
   */
  lastModifyTime: number;

  /**
   * 语言(zh,br)
   */
  languageCode: string;

  /**
   * 图标(后台上传)
   */
  icon: string;

  /**
   * 视频地址
   */
  videoUrl: string | number;

}

export interface VideoItemForm extends BaseEntity {
  /**
   * 
   */
  rowId?: string | number;

  /**
   * 2.大标题3.小标题
   */
  rowType?: number;

  /**
   * 视频编码
   */
  itemCode?: string;

  /**
   * 视频名称
   */
  itemName?: string;

  /**
   * 0:禁用 1:启用
   */
  enable?: number;

  /**
   * 是否热门 0:不是 1:是
   */
  hot?: number;

  /**
   * 热门排序
   */
  hotOrderId?: string | number;

  /**
   * 0否 1是 分类热门
   */
  recommend?: number;

  /**
   * 排序编号
   */
  orderId?: string | number;

  /**
   * 分类热门排序ID
   */
  recommendOrderId?: string | number;

  /**
   * 站点(每个租户分配一个站点标识)
   */
  site?: string;

  /**
   * 修改人
   */
  modifyBy?: string;

  /**
   * 最后修改时间
   */
  lastModifyTime?: number;

  /**
   * 语言(zh,br)
   */
  languageCode?: string;

  /**
   * 图标(后台上传)
   */
  icon?: string;

  /**
   * 视频地址
   */
  videoUrl?: string | number;

}

export interface VideoItemQuery extends PageQuery {

  /**
   * 2.大标题3.小标题
   */
  rowType?: number;

  /**
   * 视频编码
   */
  itemCode?: string;

  /**
   * 视频名称
   */
  itemName?: string;

  /**
   * 0:禁用 1:启用
   */
  enable?: number;

  /**
   * 是否热门 0:不是 1:是
   */
  hot?: number;

  /**
   * 热门排序
   */
  hotOrderId?: string | number;

  /**
   * 0否 1是 分类热门
   */
  recommend?: number;

  /**
   * 排序编号
   */
  orderId?: string | number;

  /**
   * 分类热门排序ID
   */
  recommendOrderId?: string | number;

  /**
   * 站点(每个租户分配一个站点标识)
   */
  site?: string;

  /**
   * 修改人
   */
  modifyBy?: string;

  /**
   * 最后修改时间
   */
  lastModifyTime?: number;

  /**
   * 语言(zh,br)
   */
  languageCode?: string;

  /**
   * 图标(后台上传)
   */
  icon?: string;

  /**
   * 视频地址
   */
  videoUrl?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



