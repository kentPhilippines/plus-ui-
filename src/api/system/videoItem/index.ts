import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { VideoItemVO, VideoItemForm, VideoItemQuery } from '@/api/system/videoItem/types';

/**
 * 查询video列表
 * @param query
 * @returns {*}
 */

export const listVideoItem = (query?: VideoItemQuery): AxiosPromise<VideoItemVO[]> => {
  return request({
    url: '/system/videoItem/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询video详细
 * @param rowId
 */
export const getVideoItem = (rowId: string | number): AxiosPromise<VideoItemVO> => {
  return request({
    url: '/system/videoItem/' + rowId,
    method: 'get'
  });
};

/**
 * 新增video
 * @param data
 */
export const addVideoItem = (data: VideoItemForm) => {
  return request({
    url: '/system/videoItem',
    method: 'post',
    data: data
  });
};

/**
 * 修改video
 * @param data
 */
export const updateVideoItem = (data: VideoItemForm) => {
  return request({
    url: '/system/videoItem',
    method: 'put',
    data: data
  });
};

/**
 * 删除video
 * @param rowId
 */
export const delVideoItem = (rowId: string | number | Array<string | number>) => {
  return request({
    url: '/system/videoItem/' + rowId,
    method: 'delete'
  });
};
