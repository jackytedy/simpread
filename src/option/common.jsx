console.log( "===== simpread option common load =====" )

import Button      from 'button'; 
import Notify      from 'notify';

import * as ss     from 'stylesheet';
import { storage } from 'storage';

export default class CommonOpt extends React.Component {

    static propTypes = {
        sync : React.PropTypes.func,
    }

    state = {
        update: ( update => !update ? "从未同步过，建议同步一次！" : `上次同步时间： ${ update }` ) ( storage.option.update )
    };

    sync() {
        storage.Sync( time => {
            new Notify().Render( 0, "数据同步成功。" );
            this.setState({ update: `上次同步时间： ${ time }` });
            this.props.sync && this.props.sync();
        });
    }

    import() {
        console.log( "import" )
    }

    export() {
        console.log( "export" )
    }

    render() {

        return(
            <div style={{ width: '100%' }}>
                <Button type="raised" text="与 Google 账户进行同步"
                        icon={ ss.IconPath( "sync_icon" ) }
                        color="#fff" backgroundColor="#1976D2"
                        waves="sr-button waves-effect waves-button" 
                        tooltip={{ text: this.state.update }}
                        onClick={ ()=>this.sync() } />
                <div style={{ display: 'inline-flex', width: '100%' }}>
                    <Button type="raised" text="从本地上传配置文件" width="100%" 
                            icon={ ss.IconPath( "import_icon" ) }
                            color="#fff" backgroundColor="#FF5252"
                            waves="sr-button waves-effect waves-button" 
                            tooltip={{ text: "上传后的配置将覆盖掉当前，请注意确认！" }}
                            onClick={ ()=>this.import() } />
                    <Button type="raised" text="保存配置文件到本地" width="100%" 
                            icon={ ss.IconPath( "export_icon" ) }
                            color="#fff" backgroundColor="#2196F3"
                            waves="sr-button waves-effect waves-button" 
                            onClick={ ()=>this.export() } />
                </div>
            </div>
        )

    }

}