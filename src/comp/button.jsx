console.log( "==== simpread component: Button ====" )

let current = {}, $mask, style, styles = new Map();

const raisedstyle = {
        color           : "rgba(255, 255, 255, .7)",
        backgroundColor : "rgba(0, 137, 123, 1)",
        hoverColor      : "rgba( 255, 255, 255, .4)",
    },
    flatstyle = {
        color           : "rgba(0, 0, 0, .8)",
        backgroundColor : "transparent",
        hoverColor      : "rgba( 153, 153, 153, .4)"
    },
    secondary = {
        raised : {
            //backgroundColor: 'rgba( 255, 255, 255, .4)'
            opacity: 0.6
        },
        flat: {
            opacity: 0.6,
        }
    };

const cssinjs = () => {
    const styles = {

        root: {},
        normal_root : {
            display: 'block',

            minWidth: '88px',
            height: '36px',

            margin: '6px',
            padding: 0,

            textDecoration: 'none',

            cursor: 'pointer',

            border: 'none',
            borderRadius: '2px',
        },

        mask: {
            display: '-webkit-flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
            height: '100%',

            margin: 0,
            padding: '0 16px',

            border: 'none',
            borderRadius: '2px',
            transition: 'all .5s ease-in-out',
        },

        raised: {
            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
        },

        flat: {
            fontWeight: 'bold',
        },

        span : {

            textDecoration: 'none',
            textAlign: 'center',
            letterSpacing: '.5px',

            fontSize: '15px',
            lineHeight: '1',

            userSelect: 'none',

        }
    }

    return  styles;
}

export default class Button extends React.Component {

    static defaultProps = {
        href    : "javascript:;",
        target  : "_blank",
        text    : "",
        disable : false,
        icon    : "",
        type    : "flat",
        mode    : "normal",
        color   : "",
        backgroundColor : "",
        hoverColor : "",
    }

    static propTypes = {
        href    : React.PropTypes.string,
        target  : React.PropTypes.string,
        text    : React.PropTypes.string,
        disable : React.PropTypes.bool,
        icon    : React.PropTypes.string,
        type    : React.PropTypes.string,
        mode    : React.PropTypes.string,
        color   : React.PropTypes.string,
        backgroundColor : React.PropTypes.string,
        hoverColor : React.PropTypes.string,
        onClick : React.PropTypes.func,
    }

    state = {
        id : Math.round(+new Date()),
        color: ((bool)=>bool ? flatstyle.color : raisedstyle.color)( this.props.type == "flat" ),
        backgroundColor: ((bool)=>bool ? flatstyle.backgroundColor : raisedstyle.backgroundColor)( this.props.type == "flat" ),
        hoverColor: ((bool)=>bool ? flatstyle.hoverColor : raisedstyle.hoverColor)( this.props.type == "flat" ),
    }

    onMouseOver() {
        [ style, $mask ] = [ styles.get( this.state.id ), $( this.refs.mask ) ];
        current = { backgroundColor : this.state.hoverColor };
        $mask.css({ ...style.mask, ...current });
    }

    onMouseOut() {
        [ style, $mask ] = [ styles.get( this.state.id ), $( this.refs.mask ) ];
        current = this.props.type == "raised" ? { ...style.raised } : { ...style.flat };
        current.color = this.state.color;
        current.backgroundColor = this.state.backgroundColor;
        $mask.css({ ...style.mask, ...current });
    }

    onClick() {
        this.props.onClick && this.props.onClick( event );
    }

    componentWillMount() {
        this.props.color != "" && this.setState({ color: this.props.color });
        this.props.backgroundColor != "" && this.setState({ backgroundColor: this.props.backgroundColor });
        this.props.hoverColor != "" && this.setState({ hoverColor: this.props.hoverColor });
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        current = this.props.type == "raised" ? { ...style.raised } : { ...style.flat };
        current.color = this.state.color;
        current.backgroundColor = this.state.backgroundColor;

        this.props.mode == "secondary" && 
            Object.keys( secondary[ this.props.type ] ).forEach( ( key) => {current[ key ] = secondary[ this.props.type ][ key ]});

        style.root = { ...style.normal_root, ...current };

        return (
            <a  ref="target" style={ style.root }
                href={ this.props.href } target={ this.props.target } disabled={ this.props.disable }
                type={ this.props.type } mode={ this.props.mode }
                onMouseOver={ ()=>this.onMouseOver() }
                onMouseOut={ ()=>this.onMouseOut() }
                onClick={ ()=>this.onClick() }>
                <div ref="mask" style={ style.mask }>
                    <span style={ style.span } >
                        <i></i>
                        { this.props.text }
                    </span>
                </div>
            </a>
        )
    }
}