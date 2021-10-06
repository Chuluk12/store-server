const Category = require("./models");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus}
            const category = await Category.find();
            res.render("admin/category/view_category", {
                category,
                alert,
                name: req.session.user.name,
                title: 'Halaman Kategori'
            });
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/category");
            console.log(error);
        }
    },
    viewCreate : async(req, res) => {
        try {
            res.render("admin/category/create", {
                name: req.session.user.name,
                title: 'Halaman tambah kategori'
            })
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/category");
            console.log(error)
        }
    },

    actionsCreate : async (req, res) => {
        try {
            const { name } = req.body

            let category = await Category ({ name })
            await category.save();

            req.flash("alertMessage", "Berhasil tambah kateogri");
            req.flash("alertStatus", "seccess")

            res.redirect('/category')
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/category");
            console.log(error);
        }
    },

    viewEdit : async(req, res) => {
        try {
            const { id } = req.params
            const category = await Category.findOne({_id : id})

            res.render("admin/category/edit", {
                category,
                name: req.session.user.name,
                title: 'Halaman Ubah Kategori'
            })
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/category");
            console.log(error)
        }
    },

    actionsEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const {name } = req.body;
             await Category.findOneAndUpdate({
                _id: id
            }, {name});

            
            req.flash("alertMessage", "Berhasil ubah kateogri");
            req.flash("alertStatus", "seccess")
            res.redirect("/category")
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/category");
            console.log(error)
        }
    },

    actionDelete: async(req, res)=> {
        try {
            const { id } = req.params;
             await Category.findByIdAndRemove({
                _id:id
            });

            
            req.flash("alertMessage", "Berhasil hapus kateogri");
            req.flash("alertStatus", "seccess")
            res.redirect("/category")
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertSatatus", "danger");
            res.redirect("/category");
            console.log(error)
        }
    }
}