window.CapyCrypta.OperationMode = window.CapyCrypta.OperationMode || {};

/**
 * Cipher Block Chaining \w Ciphertext stealing 
 * Messages < blockSize will be padded with zeros 
 * 
 * @param Object	Object containing \ 
 * 	-cipher: The cipher object to use
 *  -blockSize: The blocksize of the cipher
 * @author Jannis Mosshammer <mojadev@gmail.com>
 */
window.CapyCrypta.OperationMode.CBC = function(cfg) {
    this.cipher = null;
    this.blockSize = 16;
    this.paddedFlag = false; 
    this.IV = null;
    this.plainTextLength = 0;
    this.currentBlock = null;
    
    var construct = function(cfg) {
        this.blockSize = cfg["blockSize"] ? cfg["blockSize"]/8 : 16;
        this.cipher = cfg["cipher"]; 
        
        this.currentBlock = new Int8Array(this.blockSize);
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

        var result = [];//new Int8Array(this.blockSize);
        for(var i=pos,c=0;i<pos+this.blockSize;i++,c++)
            result[c] = this.cipherText[i];
        return result;
    };
    /**
     * Internal function that turns a IV string to a Int8Array (or the current date
     * if no string is given) and stores the array in the objects this.IV variable 
     * 
     * @param String	The IV to create (optional) 
     * 
     * @internal
     * @private
     */
    this.setupIV = function(IV) {
        
        this.IV = new Int8Array(this.blockSize);
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
        
        var size = 0;
        this.plainTextLength = text.length;
        if(text.length % this.blockSize === 0) { 
            size = text.length; 
            this.paddedFlag = false;
        } else { 
            size = text.length -(text.length%this.blockSize); // se retira el tamaño del IV
            size += this.blockSize; 
            this.paddedFlag = true;
        } 
        if(typeof(text) == "string") {
            this.cipherText = text;
            this.size = text.length;
        } else {
            this.cipherText = new Int8Array(size);
            for(var i=0;i<this.cipherText.length;i++) {   
                this.cipherText[i] = text[i]; //text.charCodeAt(i); 
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
		var txtEncripta = new Int8Array(text.length);
		for(var i=0;i<text.length;i++) {   
            txtEncripta[i] = text.charCodeAt(i); 	
		}
        this.initCipherBlocks(txtEncripta);
        this.setupIV(IV); 
        var Cx = this.IV;
        this.cipher.setKey(key);

        for(var i=0;i<this.plainTextLength;i+=this.blockSize) {   

			for(var c=0;c<Cx.length;c++) {   
                this.cipherText[i+c] ^= Cx[c];
            }
           
            var block = this.cipher.encrypt(this.getBlock(i)); 
            // Last block?
            if(i+this.blockSize+this.blockSize > this.plainTextLength && i!==0) { 
                //this.encryptLastBlock(i);
				var Pn = this.getBlock(i+this.blockSize);
				var dbuf = new Uint8Array(this.blockSize);

				for(var c=0;c<Pn.length;c++)
					dbuf[c] = Pn[c];				
				for(var c=0;c<this.blockSize - Pn.length;c++)
					dbuf[c + Pn.length] = 0;
				for(var c=0;c<this.blockSize;c++)
					dbuf[c] ^= block[c];
				
				var result = this.cipher.encrypt(dbuf); 
				this.addBlock(result, i);
				this.addBlock(block, i + this.blockSize);
                break;
            }

            this.addBlock(block,i);
            delete Cx;
            Cx = block;
        }
        if(typeof text === "string") {        
	        var l = (this.plainTextLength > this.blockSize) ? this.plainTextLength : this.cipherText.length;
	        var t = "";
			console.log("base: " + this.cipherText);
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
        var Cn2 = this.IV;
        for(var i=0;i<this.cipherText.length;i+=this.blockSize) { 
            // when using cts, we need the C_n-2th block
            if(i == this.cipherText.length - 3*this.blockSize) {
               Cn2 = this.getBlock(i);
            }
            // Ultimo Bloque?

            if(this.plainTextLength>this.blockSize && (i+this.blockSize*2 > this.plainTextLength) && 
                    (this.plainTextLength % this.blockSize)) {
                this.decryptLastBlocks(i,Cn2);
                break;
            }
            var block = this.getBlock(i);
            var decrypted = this.cipher.decrypt(block);
            for(var c=0;c<Cx.length;c++)
                decrypted[c] ^= Cx[c];
            delete Cx;
            Cx = block; 
            this.addBlock(decrypted,i);
        }
        if(typeof text === "string") {        
	        var t = "";
	
	        for(var x=0;x<this.plainTextLength;x++)
	           t += String.fromCharCode(this.cipherText[x]);
	        delete this.cipherText;
	        return t;
        } else {
	        var t = new Int8Array(this.plainTextLength);
	        for(var x=0;x<(this.plainTextLength);x++)
				t[x] = this.cipherText[x];
			this.cipherText = t;
        	return this.cipherText;
        }
    };
    
    /**
     * Internal function that encrypts the last two blocks using 
     * CTS 
     * 
     * @param Integer	The position of the last block 
     * 
     * @internal
     * @private
     */
	 
    this.encryptLastBlock = function(pos) {
		
			var En_1 = this.getBlock(pos-this.blockSize);
			var Pn = this.getBlock(pos);
			var len = this.blockSize + Pn.length;
			var result = new Int8Array(this.blockSize);

			for(var i=0;i<Pn.length;i++)
				result[i] = Pn[i];
			
			for(var i=0;i<En_1.length - Pn.length;i++)
				result[i + Pn.length] = 0;
			for(var i=0;i<En_1.length;i++)
				result[i] ^= En_1[i];

            var block = this.cipher.encrypt(result); 

			this.addBlock(block, this.blockSize);
			for(var x=0;x<En_1.length;x++)
				this.cipherText[pos+x] = En_1[x];

			
			/////////////////////////////////////
			
			
	   
    };
	
	
	
    var d = function(text,uint8) {
        var t = "";
        for(var i=0;i<uint8.length;i++) {
            t += uint8[i].toString(16)+" ";
        }

    };

    
    /**
     * Internal function that decrypts the last two blocks using 
     * CTS 
     * 
     * @param Integer	The position of the last block - 1
     * @param Array		The encrypted value of the third last block
     * @internal
     * @private
     */

    /**
	 * @autor: BTG [05/09/2016]
	 * @descripción: Método Modificado para que tome el algoritmo definido en "aesfile.c"
	 *               Algoritmo del Dr Brian Gladman, su descripción a continuación:
					 Ciphertext stealing modifies the encryption of the last two CBC
					  blocks. It can be applied invariably to the last two plaintext
					  blocks or only applied when the last block is a partial one. For
					  a plaintext consisting of N blocks, with the last block possibly
					  a partial one, ciphertext stealing works as shown below (note the
					  reversal of the last two ciphertext blocks).  During decryption 
					  the part of the C:N-1 block that is not transmitted (x) can be 
					  recoverd from the decryption of the last but one ciphertext block
					  since this is xored with the zero padding appended to the last
					  plaintext block.
					Detalle del algoritmo correspondiente al método:
					
					int decfile(FILE *fin, FILE *fout, aes_ctx *ctx, const char* ifn, const char* ofn)
	 */
    this.decryptLastBlocks = function(pos,C_n2) {
        var Cn = this.getBlock(pos+this.blockSize); // Ultimo bloque  = b2
        var En = this.cipher.decrypt(this.getBlock(pos)); // bloque actual = dbuf
        var B = this.plainTextLength%this.blockSize;
		var len = this.blockSize + B;

		var tmp2 = new Int8Array(this.blockSize);
		/* append high part of last decrypted block */
		for(i = B; i < this.blockSize; ++i)
			Cn[i] = En[i];

		/* decrypt last block of plaintext */
		for(i = 0; i < B; ++i)
			//En[i + this.blockSize] = En[i] ^ Cn[i];
			tmp2[i] = En[i] ^ Cn[i];

		var tmp = this.cipher.decrypt(Cn);
		for(i = 0; i < this.blockSize; i++) {
			En[i] = tmp[i];
		}
		
        for(var y=0;y<this.blockSize;y++)
            En[y] ^= C_n2[y];
        this.addBlock(En,pos); 
        this.addBlock(tmp2,pos+this.blockSize); 
		
    };

    construct.call(this,cfg);
};
