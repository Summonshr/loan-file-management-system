import Axios from "axios";

export const account = {
    async details(foracid){
        let response = await Axios.post('http://localhost:3030/select', { query: `Select * from tbaadm.gam where acct_cls_flg='N' and del_flg = 'N' and schm_type = 'LAA' and acct_ownership ='C' and foracid = '${foracid}' fetch first 1 rows only` })
        return response.data.rows[0] || false;
    }
}