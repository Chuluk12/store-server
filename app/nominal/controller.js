const Nominal = require("./model");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus}
            const nominal = await Nominal.find();

            res.render("admin/nominal/view_nominal", {
                nominal,
                alert,
                name: req.session.user.name,
                title: 'Halaman Nominal'
            });
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/nominal");
            console.log(error);
        }
    },

    viewCreate : async (req, res)=> {
        try {
            res.render("admin/nominal/create", {
                name: req.session.user.name,
                title: 'Halaman tambah nominal'
            })
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/nominal");
            console.log(error)
        }
    },

    actionsCreate : async (req, res) => {
        try {
            const { coinName, coinQuantity, price } = req.body;

            let nominal = await Nominal ({ coinName, coinQuantity, price })
            await nominal.save();

            req.flash("alertMessage", "Berhasil tambah nominal");
            req.flash("alertStatus", "seccess")

            res.redirect('/nominal')
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/nominal");
            console.log(error);
        }
    },

    viewEdit : async(req, res) => {
        try {
            const { id } = req.params
            const nominal = await Nominal.findOne({_id : id})

            res.render("admin/nominal/edit", {
                nominal,
                name: req.session.user.name,
                title: 'Halaman Ubah Nominal'
            })
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/nominal");
            console.log(error)
        }
    },

    actionsEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const {coinName, coinQuantity, price } = req.body;
             await Nominal.findOneAndUpdate({
                _id: id
            }, {coinName, coinQuantity, price});

            
            req.flash("alertMessage", "Berhasil ubah Nominal");
            req.flash("alertStatus", "seccess")
            res.redirect("/nominal")
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/nominal");
            console.log(error)
        }
    },

    actionDelete: async(req, res)=> {
        try {
            const { id } = req.params;
             await Nominal.findByIdAndRemove({
                _id:id
            });

            
            req.flash("alertMessage", "Berhasil hapus nominal");
            req.flash("alertStatus", "seccess")
            res.redirect("/nominal")
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/nominal");
            console.log(error)
        }
    }
}