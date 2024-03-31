import './index.css'
const StarsLayout = ({ children }: { children: React.ReactNode }) => {
    return (<main className="min-h-screen w-full overflow-hidden" id='star'>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>

        <section className='w-screen min-h-screen flex items-center justify-center'>
            {children}
        </section>
    </main>
    );
}

export default StarsLayout;