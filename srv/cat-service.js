module.exports = (srv) => {

    const {Books} = cds.entities ('my.bookshop')
  
    // Reduce stock of ordered books
    srv.before ('CREATE', 'Orders', async (req) => {
      const order = req.data
      if (!order.amount || order.amount <= 0)  return req.error (400, 'Order at least 1 book')
      const tx = cds.transaction(req)
      const affectedRows = await tx.run (
        UPDATE (Books)
          .set   ({ stock: {'-=': order.amount}})
          .where ({ stock: {'>=': order.amount},/*and*/ ID: order.book_ID})
      )
      if (affectedRows === 0)  req.error (409, "Sold out, sorry")
    })

    // Reduce stock of ordered books
    srv.before ('CREATE', 'Books', async (req) => {
      const order = req.data
      const tx = cds.transaction(req)

      let textoEncriptado = encrypt(order.texto);

      const affectedRows = await tx.run (
        UPDATE (Books)
          .set   ({ texto: {'=': textoEncriptado}})
      )
      if (affectedRows === 0)  req.error (409, "Sold out, sorry")
    })
  
    // Add some discount for overstocked books
    srv.after ('READ', 'Books', each => {
      if (each.stock > 111)  each.title += ' -- 11% discount!'

      let textoEncriptado = encrypt(each.title);
      let textoDecriptado;
      if (each.title) {
        // textoDecriptado = decrypt(each.title);
        // each.texto = textoDecriptado;
        each.texto = textoEncriptado;
        textoDecriptado = decrypt(each.texto);
        each.texto2 = textoDecriptado;
      }
    })
  
		const crypto = require('crypto');
		const algorithm = 'aes-256-cbc';
		const key = crypto.randomBytes(32);
		const iv = crypto.randomBytes(16);

		function encrypt(text) {
		  const cipher = crypto.createCipheriv(algorithm, key, iv);
		  let encrypted = cipher.update(text, 'utf8', 'hex');
		  encrypted += cipher.final('hex');
		  return encrypted;
		}

		function decrypt(encrypted) {
		  const decipher = crypto.createDecipheriv(algorithm, key, iv);
		  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
		  decrypted += decipher.final('utf8');
		  return decrypted;
		}

  }
  