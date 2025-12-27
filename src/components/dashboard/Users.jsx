import React from 'react';

const users = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 987 654 321" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "+1 555 123 456" },
    { id: 4, name: "Robert Brown", email: "robert@example.com", phone: "+1 444 555 666" },
    { id: 5, name: "Emily Davis", email: "emily@example.com", phone: "+1 777 888 999" },
];

export default function Users() {
    return (
        <div className="w-full">
            <h2 className="text-4xl font-modern-negra text-white mb-8">
                Manage <span className="text-yellow">Users</span>
            </h2>

            <div className="overflow-hidden rounded-3xl border border-yellow/20 bg-black/50 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white">
                        <thead className="bg-yellow/20 text-yellow font-sans uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-6 py-5 font-bold">Name</th>
                                <th className="px-6 py-5 font-bold">Email</th>
                                <th className="px-6 py-5 font-bold">Phone</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow/10 font-sans text-sm">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-base">{user.name}</td>
                                    <td className="px-6 py-4 text-white/70">{user.email}</td>
                                    <td className="px-6 py-4 text-white/70">{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
