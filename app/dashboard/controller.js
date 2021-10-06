const Transaction = require('../transaction/model');
const Voucher = require('../voucher/model');
const Player = require('../player/model');
const Category = require('../category/models');

module.exports = {
  index: async (req, res) => {
    try {

      const player = await Player.countDocuments()
      const transaction = await Transaction.countDocuments()
      const voucher = await Voucher.countDocuments()
      const category = await Category.countDocuments()
      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'Halaman Dashboard',
        count: {
          transaction,
          player,
          voucher,
          category
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}