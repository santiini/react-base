// 方式1：正常导入
import devConfigStore from './configStore.dev';
import prodConfigStore from './configStore.prod';

const exportConfig = process.env.NODE_ENV === 'production' ? prodConfigStore : devConfigStore;

export default exportConfig;
