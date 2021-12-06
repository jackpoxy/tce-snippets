// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const keywordMap: { [key: string]: string } = {
    showBackButton: `
- 属性：showBackButton
- 类型：boolean
- 必选：false
- 默认值：-
- 说明：是否显示返回按钮
    `,
    onBackButtonClick: `
- 属性：onBackButtonClick
- 类型：(event: React.MouseEvent) => void
- 必选：false
- 默认值：-
- 说明：点击返回按钮触发的事件
    `,
    showRegion: `
- 属性：showRegion
- 类型：boolean
- 必选：false
- 默认值：false
- 说明：是否显示区域选择控件
    `,
    productCode: `
- 属性：productCode
- 类型：string
- 必选：false
- 默认值：-
- 说明：showRegion【350】之后产品所属的 product Code ，不同产品 Region 列表不同
    `,
    regionList: `
- 属性：regionList
- 类型：any[]
- 必选：false
- 默认值：-
- 说明：是否自定义区域内容，不传表示使用控制台区域列表
    `,
    onRegionChange: `
- 属性：onRegionChange
- 类型：(val: string, obj: any) => void;
- 必选：false
- 默认值：-
- 说明：选择区域时触发的事件【val 表示当前选中的区域 value，obj 表示当前区域列表数组】，如果不传这个方法，切换 region 后会自动重新渲染 layout 下面的组件，如果使用了 onRegionChange，则不会重新渲染，需要自己控制
    `,
    layoutTabs: `
- 属性：layoutTabs
- 类型：TCELayoutTabs
- 必选：false
- 默认值：-
- 说明：layoutTabs 中的 showTabs 为 true 则渲染 tabs
    `,
    status: `
- 属性：status
- 类型：IStatus
- 必选：false
- 默认值：none
- 说明：用于显示 loadding 或者 异常 状态; 可选值：none(不显示), loading, INetwork({title: '可选，自定义状态标题，默认值 暂无数据', description: '可选，状态的描述，默认值 无', btnText: '可选，自定义按钮的文字，默认值重试', onRetryClick: () => void,用户点击重试按钮后的回调})(异常情况)
    `,
    initialValues: `
- 参数：initialValues
- 说明：字段初始值
- 类型：object
- 默认值：undefined
- 必填：是
    `,
    validationSchema: `
- 参数：validationSchema
- 说明：校验规则
- 类型：object
- 默认值：undefined
- 必填：否
    `,
    validate: `
- 参数：validate
- 说明：表单级校验
- 类型：func(values)
- 默认值：undefined
- 必填：否
    `,
    onSubmit: `
- 参数：onSubmit
- 说明：表单提交回调
- 类型：func(values, actions)
- 默认值：undefined
- 必填：是
    `,
    layout: `
- 参数：layout
- 说明：布局方式
- 类型：string
- 默认值：default
- 必填：否
    `,
    readonly: `
- 参数：readonly
- 说明：只读表单
- 类型：boolean
- 默认值：false
- 必填：否
    `,
    render: `
- 参数：render
- 说明：是否必填
- 类型：func
- 默认值：undefined
- 必填：是
    `,
    required: `
- 参数：required
- 说明：是否必填	
- 类型：boolean
- 默认值：false
- 必填：否
    `,
    showSuccess: `
- 参数：showSuccess
- 说明：校验成功 Icon	
- 类型：boolean
- 默认值：false
- 必填：否
    `,
    tail: `
- 参数：tail
- 说明：单位	
- 类型：string
- 默认值：false
- 必填：否
    `,
    readonlyValue: `
- 参数：readonlyValue
- 说明：只读模式下内容		
- 类型：string
- 默认值：undefined
- 必填：否
    `,
    readonlyPositions: `
- 参数：readonlyPositions
- 说明：ip 只读位数			
- 类型：array
- 默认值：[]
- 必填：否
    `,
    steps样例: `
      [
        // 普通组件用法
        {
          id: 'prepare',
          label: '验证备案类型',
          component: <Prepare />,
          onNextClick: ({ dispatch }) => {
            console.log('prepare');
            return (
              new Promise() <
              boolean >
              ((resolve) => {
                setTimeout(() => {
                  resolve(true);
                }, 2000);
              })
            );
          }
        },
        // 深层次组件用法
        {
          id: 'info',
          label: '填写备案信息',
          component: <Info />,
          onNextClick: () => {
            console.log('info');
            return true;
          },
          showPrev: false
        },
        // 方法用法
        {
          id: 'upload',
          label: '上传资料',
          component: ({ values, dispatch }) => {
            return <div>upload comp ({JSON.stringify(values)})</div>;
          },
          onNextClick: ({ values, dispatch }) => {
            console.log('upload: ', JSON.stringify(values));
            values.gender = 'male';
            dispatch({ type: StepActionTypes.SetValue, payload: values });
            return true;
          }
        },
        // 不需要数据流管理用法
        {
          id: 'finish',
          label: '完成备案',
          component: <div>finish comp</div>,
          onNextClick: () => {
            console.log('finish');
            return true;
          },
          showPrev: false,
          showNext: false,
          showCancel: false
        }
      ]
    `,
    initStep: `
- 参数：initStep
- 说明：字段名	
- 类型：string
- 默认值：undefined
- 必填：否
    `,
    initValues: `
- 参数：initValues
- 说明：字段名	
- 类型：string
- 默认值：undefined
- 必填：否
    `,
    submitText: `
- 参数：submitText
- 说明：提交按钮	
- 类型：string
- 默认值：undefined
- 必填：否
    `,
    contentPadding: `
- 参数：contentPadding
- 说明：内容区域间隔	
- 类型：string
- 默认值：0
- 必填：否
    `,
    sourceTablePage: `
- 参数：sourceTablePage
- 说明：左侧 Table 的参数，同 TablePage 参数	
- 类型：ITPProps
- 必填：是
    `,
    targetTablePage: `
- 参数：targetTablePage
- 说明：右侧 Table 的参数，同 TablePage 参数	
- 类型：ITPProps
- 必填：是
    `,
    titleLeft: `
- 参数：titleLeft
- 说明：左侧的标题	
- 类型：React.ReactNode
- 必填：是
    `,
    titleRight: `
- 参数：titleRight
- 说明：右侧的标题	
- 类型：\`React.ReactNode\`
- 必填：是
    `,
    bubbleContent: `
- 参数：bubbleContent
- 说明：对标题的解释说明。当传入的时候，在标题的右侧会显示一个小问号，鼠标 hover 会显示说明内容
- 类型：\`React.ReactNode\` | \`string\`
- 默认值：-
- 必填：否
    `,
    tableEditorRecords样例: `
    const records = [
      {
        desc: 'test2',
        ipProtocol: 'udp',
        cidrIp: '10.0.0.2/32',
        portRange: '80',
        action: 1
      },
      {
        desc: 'test',
        ipProtocol: 'tcp',
        cidrIp: '10.0.0.1/32',
        portRange: 'ALL',
        action: 1
      },
      {
        desc: '',
        ipProtocol: 'all',
        cidrIp: '0.0.0.0/0',
        portRange: 'ALL',
        action: 1
      }
    ].map((item) => ({
      ...item,
      _proto: getNameByProto(item.ipProtocol)
    }));
    `,
    tableEditorColumns样例: `
    const columns = [
      {
        key: 'ipProtocol',
        header: '协议类型',
        defaultValue: 'tcp',
        hide: true
      },
      {
        key: '_proto',
        header: '协议类型',
        render: ({ field, table }) => {
          const { record, rowKey, rowIndex, setFieldValue } = field;
          const { values } = table;
    
          if (rowIndex === values.length - 1) {
            return <span>{getNameByProto(record.ipProtocol)}</span>;
          }
    
          const options = protocol.map((item) => ({
            value: item.name,
            text: item.name
          }));
    
          return (
            <ControlledSelect
              rowKey={rowKey}
              name="_proto"
              value={record._proto}
              options={options}
              onChange={(value) => {
                setFieldValue('defaultDisable', false);
    
                if (PROTOCOL_MAP[value].port || record.portRange === '-') {
                  setFieldValue('portRange', PROTOCOL_MAP[value].port || 'ALL');
                }
              }}
            />
          );
        }
      },
      {
        key: 'portRange',
        header: '端口',
        defaultValue: '',
        render: ({ field, table }) => {
          const { record, rowIndex, rowKey } = field;
          const { values } = table;
    
          if (rowIndex === values.length - 1) {
            return <span>{record.portRange}</span>;
          }
    
          return (
            <ControlledInput
              rowKey={rowKey}
              name="portRange"
              value={record.portRange}
              disabled={
                record.defaultDisable ||
                !PROTOCOL_MAP[record._proto] ||
                !PROTOCOL_MAP[record._proto].portEdit
              }
              validate={(value) => {
                let error;
    
                // 端口值可为空、'-'、'ALL'
                if (value !== 'ALL' && value !== '-' && !isValidPort(value)) {
                  error = '填入端口号或端口范围,例如:10或1-10';
                }
                return error;
              }}
              placeholder="ALL"
              size="xs"
            />
          );
        }
      },
      {
        key: 'cidrIp',
        header: '源IP',
        defaultValue: '',
        render: ({ field, table }) => {
          const { record, rowIndex, rowKey } = field;
          const { values } = table;
    
          if (rowIndex === values.length - 1) {
            return <span>{record.cidrIp}</span>;
          }
    
          return (
            <ControlledInput
              rowKey={rowKey}
              name="cidrIp"
              value={record.cidrIp}
              validateKeys={['cidr']}
              placeholder="自行指定默认值"
              required
            />
          );
        }
      },
      {
        key: 'action',
        header: '策略',
        defaultValue: '1',
        width: 150,
        render: ({ field, table }) => {
          const { record, rowIndex, rowKey } = field;
          const { values } = table;
    
          if (rowIndex === values.length - 1) {
            return <span>{record.action === 0 ? '允许' : '拒绝'}</span>;
          }
    
          return (
            <ControlledSelect
              rowKey={rowKey}
              name="action"
              value={record.action}
              options={[
                { value: '0', text: '允许' },
                { value: '1', text: '拒绝' }
              ]}
              required={true}
              size="s"
            />
          );
        }
      }
    ];
    `,
    notRemovedData: `
- 参数：notRemovedData
- 说明：保留在界面上且没有被删除的数据，如果有错误为 null。
- 类型：\`array\`
    `,
    removedData: `
- 参数：removedData
- 说明：保留在界面上且被删除的数据，若选择了不支持恢复删除的操作该项为空，如果有错误为 null 。
- 类型：\`array\`
    `,
    originalData: `
- 参数：originalData
- 说明：原来的数据，如果有错误为 null。
- 类型：\`array\`
    `,
    btnsList: `
- 参数：btnsList
- 说明：提交按钮后的自定义 button 列表
- 类型：\`ButtonProps\` & { text: string }[]
- 默认值：[]
- 必填：否
    `,
    tableEditorMaxSize: `
- 参数：maxSize
- 说明：最大行数，未指定不进行行数的限制。
- 类型：\`number\`
- 默认值：undefined
- 必填：否
    `,
    maxLimitTips: `
- 参数：maxLimitTips
- 说明：最大数量限制提示
- 类型：\`string\`
- 默认值：""
- 必填：否
    `,
    hidePreAction: `
- 参数：hidePreAction
- 说明：是否前置操作列，目前即指隐藏上下移操作列。
- 类型：\`boolean\`
- 默认值：false
- 必填：否
    `,
    showIndex: `
- 参数：showIndex
- 说明：是否显示序号列
- 类型：\`boolean\`
- 默认值：true
- 必填：否
    `,
    rowFixable: `
- 参数：rowFixable
- 说明：符合条件的行固定在底部或顶部，返回 default 为不固定，返回 top 为固定在顶部，返回 bottom 为固定在底部。
- 类型：(rowRecord?: T, tableRecords?: T[]) => \`string\`
- 默认值：undefined
- 必填：否
    `,
    rowHideDefaultOperation: `
- 参数：rowHideDefaultOperation
- 说明：隐藏该行所在的默认操作栏，action 为尾部操作列，preAction 为头部操作列，sort(index 废弃) 为序号列，default 为按默认的全局设置。可指定多个。
- 类型：(rowRecord?: T, tableRecords?: T[]) => \`string\`[]
- 默认值：undefined
- 必填：否
    `,
    onFetchData: `
- 参数：onFetchData
- 说明：获取数据回调
- 类型：\`func\`
- 默认值：undefined
- 必填：否
    `,
    pageConfig: `
- 参数：pageConfig
- 说明：与 Tea PageableOptions相同，有此项才会显示分页控件[点击查看详情](http://tea.tencent.com/component/table/PageableOptions)
- 类型：pageConfig / boolean。 值为 true 时 pageSize 默认为 20
- 默认值：undefined
- 必填：否
    `,
    onFetchData样例: `
    function onFetchData(params, fetchParam, setRecords) {
      console.log('search params: ', params);
  
      // 出错时调用注入的 errorHandler，传入出错信息
      const { errorHandler } = params;
  
      setTimeout(() => {
        setRecords(cvmList.splice(1));
      }, 1500);
  
      // 返回值必须按约定格式，提供 recordCount 和 records 字段
      return new Promise<{
        recordCount: number;
        records: any[];
      }>((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          console.log('random: ', random);
  
          if (random > 0.5) {
            resolve({ records: cvmList, recordCount: 100 });
          } else {
            resolve(errorHandler('自定义错误字符串'));
          }
        }, 1000);
      });
    }
    `,
    columns样例: `
    const columns: ITableColumn[] = [
      {
        key: 'instance',
        header: 'ID/实例名',
        render: (cvm) => (
          <>
            <p>
              <a>{cvm.instanceId}</a>
            </p>
            <p>{cvm.instanceName}</p>
          </>
        )
      },
      {
        key: 'status',
        header: '状态',
        width: 100,
        render: (cvm) => {
          if (cvm.status === 'running') {
            return <span style={{ color: 'green' }}>运行中</span>;
          }
          if (cvm.status === 'stopped') {
            return <span style={{ color: 'red' }}>已关机</span>;
          }
          return cvm.status;
        }
      },
      {
        key: 'area',
        header: '可用区域'
      },
      {
        key: 'modal',
        header: '主机型号'
      },
      {
        key: 'publicIP',
        header: 'IP 地址'
      },
      {
        key: 'desc',
        header: '描述',
        align: 'right'
      }
    ];
    `,
    contextExample: `
    const themes = {
      light: {
        foreground: "#000000",
        background: "#eeeeee"
      },
      dark: {
        foreground: "#ffffff",
        background: "#222222"
      }
    };
    
    const contextExample = React.createContext(themes.light);
    `,
    reducerExample: `
    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        default:
          throw new Error();
      }
    }
    `,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TableEditor: `
[点击查看详情](http://test.jiguang.tce.oa.com/tcefe/TableEditor)
    `,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TCELayout: `
[点击查看详情](http://test.jiguang.tce.oa.com/tcefe/layout)
    `,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Selector: `
[点击查看详情](http://test.jiguang.tce.oa.com/tcefe/selector)
    `,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    GroupTitle: `
[点击查看详情](http://test.jiguang.tce.oa.com/tcefe/groupTitle)
    `,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    LocalConfirm: `
[点击查看详情](http://test.jiguang.tce.oa.com/tcefe/localconfirm)
    `,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TablePage: `
[点击查看详情](http://test.jiguang.tce.oa.com/tcefe/tablePage)
    `,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TCEForm: `
[点击查看详情](http://test.jiguang.tce.oa.com/tcefe/tablePage)
    `
  };

	let disposable = vscode.languages.registerHoverProvider(['typescript', 'javascript', 'typescriptreact', 'javascriptreact'], {
    provideHover(document, position, token) {
      const fileName = document.fileName;
      const word = document.getText(document.getWordRangeAtPosition(position));
      if (keywordMap[word]) {
        const allText = document.getText();
        return new vscode.Hover(new vscode.MarkdownString(keywordMap[word]));
      }
      return undefined;
    },
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated

