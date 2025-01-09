import axios from 'axios';
import React, { ChangeEvent } from 'react'
import { URL } from '../../Base';
import Loader from '../../Loader';
import { toast } from 'react-toastify';

const SmtpCreate: React.FC = () => {

    const [host, setHost] = React.useState<string>("");
    const [port, setPort] = React.useState<number>(465);
    const [user, setUser] = React.useState<string>("");
    const [pass, setPass] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);
    const handleSubmitSmtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('host', host);
            formData.append('port', String(port));
            formData.append('user', user);
            formData.append('pass', pass);

            const res = await axios.post(`${URL}/mail-config`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                },
            });

            if (res.data) {
                console.log(res.data);
                toast.success('Uğurla yeniləndi!', {
                    position: 'top-center'
                });
            } else {
                console.log(res.status);
                toast.error('Problem baş verdi', {
                    position: 'top-center'
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Problem baş verdi', {
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    }

    const [loadingData, setLoadingData] = React.useState<boolean>(false);
    const getDefaultConfigs = async () => {
        setLoadingData(true);
        try {
            const res = await axios.get(`${URL}/mail-config`);
            if (res.data) {
                setPort(res.data[0]?.port || '');
                setHost(res.data[0]?.host || '');
                setUser(res.data[0]?.user || '');
                setPass(res.data[0]?.pass || '');
                setLoadingData(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingData(false);
        }
    }

    React.useEffect(() => {
        getDefaultConfigs();
    }, []);

    if (loadingData) {
        return <Loader />
    }

    return (
        <div className='smpt-config-div'>
            <h2>Mail yönləndirmə konfiqurasiyaları</h2>
            <form onSubmit={handleSubmitSmtp}>
                <div className="input-field">
                    <label>HOST *:</label>
                    <input
                        type="text"
                        placeholder="Məs: smtp.yandex.ru"
                        required
                        name='host'
                        value={host}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            setHost(value?.trim());
                        }}
                    />
                </div>
                <div className="input-field">
                    <label>PORT:</label>
                    <input
                        type="number"
                        name='port'
                        value={port}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPort(Number(e.target.value))}
                        placeholder="Məs: 465 (Bu məcburi deyil, qeyd etməsəniz default dəyər 465 olacaqdır)"
                    />
                </div>
                <div className="input-field">
                    <label>USER *:</label>
                    <input
                        type="text"
                        name='user'
                        value={user}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            setUser(value?.trim());
                        }}
                        placeholder="Məs: website@ekol.az"
                        required
                    />
                </div>
                <div className="input-field">
                    <label>PASSWORD *:</label>
                    <input
                        type="password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setPass(e.target.value);
                        }}
                        value={pass}
                        name='pass'
                        placeholder="SMTP şifrəniz"
                        required
                    />
                </div>
                <button type='submit'>{loading ? 'Saxlanılır...' : 'Dəyişdir'}</button>
            </form>
        </div>
    )
}

export default SmtpCreate