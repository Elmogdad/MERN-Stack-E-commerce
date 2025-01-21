

const Message = ({variant, childern}) => {

    const getVariantClass = () => {
        switch (variant) {
            case 'success': 
                return 'bg-green-100 text-green-800 border-green-400'
            case 'error':
                return 'bg-red-100 text-red-800 border-red-400' 
                default:
                    return 'bg-blue-100 text-blue-800 border-blue-400'
        }
    }
  return (
    <div className={`p-4 rounded ${getVariantClass()}`}>{childern}</div>
  )
}

export default Message