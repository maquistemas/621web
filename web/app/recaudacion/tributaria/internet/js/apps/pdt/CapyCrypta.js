/**
*   CapyCrypta base class
*     
* @package CapyCrypta
* @author  Jannis Mosshammer <mojadev@gmail.com>
**/
window.CapyCrypta = {
        /**
         * @param Object    Configuration object. Can have \
         *         - cipher [optional]   :    currently only AES (default) allowed
         *         - keyLength [optional]:    the Keylength to use for the cipher (AES allows 128, 192 and 256 (default))
         *         - moo [optional]      :    Mode of operation currently only CBC (default) allowed 
         *         - blockSize [optional]:    The blockisze of the cipher (128 bit, it's best not to use this param)      
         * @return  Object      An encryption object, depending on the Mode of operation
         *   
         **/
    "createEncrypter": function(cfg) {
        cfg = cfg || {};
        var cipher = {
            "AES": window.CapyCrypta.AES
        }[cfg["cipher"]] || window.CapyCrypta.AES;
        
        var moo = {
           "CBC": window.CapyCrypta.OperationMode.CBC
        }[cfg["moo"]] || window.CapyCrypta.OperationMode.CBC;
        
        return new moo({
            "blockSize": cfg["blockSize"] || 128,
            "cipher": new cipher({
                "keyLength": cfg["keyLength"] || 128
            })
        });
     }
};
