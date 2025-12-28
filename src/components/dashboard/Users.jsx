import React, { useEffect } from 'react';
import { useUsersStore } from '../../store/Users.store'

export default function Users() {
    const { getAllUsers, users } = useUsersStore()
    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])
    console.log(users);
    return (
        <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-modern-negra text-white mb-8 text-center md:text-left">
                Manage <span className="text-yellow">Users</span>
            </h2>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-yellow/20 bg-black/50 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white">
                        <thead className="bg-yellow/20 text-yellow font-sans uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-6 py-5 font-bold">Name</th>
                                <th className="px-6 py-5 font-bold">Email</th>
                                <th className="px-6 py-5 font-bold">Phone</th>
                                <th className="px-6 py-5 font-bold">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow/10 font-sans text-sm">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-base">{user.name}</td>
                                    <td className="px-6 py-4 text-white/70">{user.email}</td>
                                    <td className="px-6 py-4 text-white/70">{user.phone}</td>
                                    <td className="px-6 py-4 text-white/70">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-black/50 border border-yellow/20 rounded-2xl p-5 space-y-3 shadow-lg backdrop-blur-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-white">{user.name}</h3>
                                <p className="text-white/50 text-sm">{user.email}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-yellow/10 text-yellow text-xs font-bold uppercase border border-yellow/20">
                                {user.role}
                            </span>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                            <span className="text-white/50">Phone</span>
                            <span className="text-white font-mono">{user.phone}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
