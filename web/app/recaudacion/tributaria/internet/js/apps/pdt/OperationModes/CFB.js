window.CapyCrypta.OperationMode = window.CapyCrypta.OperationMode || {};

/**
 * Cipher Feedback mode 
 * @param Object	Object containing \ 
 * 	-cipher: The cipher object to use
 *  -blockSize: The blocksize of the cipher
 * @author Jannis Mosshammer <mojadev@gmail.com>
 */
window.CapyCrypta.OperationMode.CFB = function(cfg) {
    this.cipher = null;
    this.blockSize = 16;
 
    this.IV = null;
    this.plainTextLength = 0;
    this.currentBlock = null;
    
    var construct = function(cfg) {
        this.blockSize = cfg["blockSize"] ? cfg["blockSize"]/8 : 16;
        this.cipher = cfg["cipher"]; 
        
        this.currentBlock = new Uint8Array(this.blockSize);
    };
    
    
    /**
     * Adds a block arr from pos to pos+this.blockSize
     * @param Array	The block to add
     * @param Integer The start position of this block 
     */
    this.addBlock = function(arr,pos) {
        for(var i=pos,c=0;i<pos+this.blockSize;i++,c++) {
            this.cipherText[i] = arr[c];
        } 
    };
    
    /**
     * Returns a block arr from pos to pos+this.blockSize
     *
     * @param Integer The start position of the block to return
     * @return	A copy of this block 
     */
    this.getBlock = function(pos) {

        var result = [];//new Uint8Array(this.blockSize);
        for(var i=pos,c=0;i<pos+this.blockSize;i++,c++)
            result[c] = this.cipherText[i];
        return result;
    };
    /**
     * Internal function that turns a IV string to a Uint8Array (or the current date
     * if no string is given) and stores the array in the objects this.IV variable 
     * 
     * @param String	The IV to create (optional) 
     * 
     * @internal
     * @private
     */
    this.setupIV = function(IV) {
        
        this.IV = new Uint8Array(this.blockSize);
        if(typeof IV === "undefined")
        	IV = Date.parse();
        for(var i=0;i<this.blockSize;i++) {
            if(IV.length <= i)
                this.IV[i] = i;
            this.IV[i] = (typeof IV == "string") ? 
                            IV.charCodeAt(i) : IV[i];
        }
    };
    
    /**
     * Creates a typed array from the ciphertext (plain or encrypted)
     *  
     * @param String	The string to use
     */
    this.initCipherBlocks = function(text) {
        this.plainTextLength = text.length;
        var size = text.length; 
        
        if(typeof(text) !== "string") {
            this.cipherText = text;
            this.size = text.length;
        } else {
            this.cipherText = new Uint8Array(size);
            for(var i=0;i<this.cipherText.length;i++) {   
                this.cipherText[i] = text.charCodeAt(i); 
            }
        }
        
    };
    
    /**
     * Encrypts a text with a key and an IV
     * 
     * @param String The text to encrypt
     * @param String The key to use for encryption
     * @param String The Initialisation Vector to use, if any (otherwise the current timestamp is used)
     * 
     * @return String	The encrypted string
     */
    this.encrypt = function(text, key, IV) {
        this.initCipherBlocks(text);
        this.setupIV(IV); 
        var Cx = this.IV;
		alert(Cx+"entra al encrypt");
        this.cipher.setKey(key);
        for(var i=0;i<this.plainTextLength;i+=this.blockSize) {   
            var block = this.cipher.encrypt(Cx);
            for(var c=0;c<block.length;c++) {
                Cx[c] = this.cipherText[i+c] = block[c]^this.cipherText[i+c];
            }
        }
  
        if(typeof text === "string") {        
	        var l = (this.plainTextLength > this.blockSize) ? this.plainTextLength : this.cipherText.length;
	        var t = "";
	        for(var x=0;x<l;x++)
	           t += String.fromCharCode(this.cipherText[x]);
	        delete this.cipherText;
	        return t;
        } else {
        	return this.cipherText;
        }
      
    };

    /**
     * Decrypts an encrypted string with a key and an IV
     * 
     * @param String The text to decrypt
     * @param String The key to use for decryption
     * @param String The Initialisation Vector to use, if any (otherwise the current timestamp is used)
     * 
     * @return String	The plaintext
     */
    this.decrypt = function(text, key, IV) {
    	if(typeof IV === "undefined")
            throw("No IV given for decryption");
        this.initCipherBlocks(text);
        this.setupIV(IV);
        this.paddedFlag = false;
        var Cx = this.IV;
        this.cipher.setKey(key);
        for(var i=0;i<this.plainTextLength;i+=this.blockSize) {   
            var block = this.cipher.encrypt(Cx);
            for(var c=0;c<block.length;c++) {
                Cx[c] = this.cipherText[i+c];
                this.cipherText[i+c] = block[c]^this.cipherText[i+c];
            }
        }
 
        if(typeof text === "string") {        
	        var t = "";
	
	        for(var x=0;x<this.plainTextLength;x++)
	           t += String.fromCharCode(this.cipherText[x]);
	        delete this.cipherText;
	        return t;
        } else {
        	return this.cipherText;
        }
    };

    construct.call(this,cfg);
};
